<script>
import { on } from 'cluster';
export default {
  
}
// leaflet easybutton
// https://github.com/CliffCloud/Leaflet.EasyButton

/**
 * util functions
 * 
 */
const buildIcon = function(ambiguousIconString) {
  let tmpIcon

  // does this. look like html?(i.e not a class)
  if (ambiguousIconString.match(/[&;=<>"']/)) {
    // if so, the user should have put in html
    // so move forward as such
    tmpIcon = ambiguousIconString

    // then it wasn't html,so
    // it's a class list, figure out what kind
  } else {
    ambiguousIconString = ambiguousIconString.replace(/(^\s*|\s*$)/g, '')
    tmpIcon = L.DomUtil.create('span', '')

    if (ambiguousIconString.indexOf('fa-') === 0) {
      L.DomUtil.addClass(tmpIcon, 'fa ' + ambiguousIconString)
    } else if (ambiguousIconString.indexOf('glyphicon-') === 0) {
      L.DomUtil.addClass(tmpIcon, 'glyphicon ' + ambiguousIconString)
    } else {
      L.DomUtil.addClass(tmpIcon, /** rollwithit */ ambiguousIconString)
    }

    // make this a string so that it's easy to set innerHTML below
    tmpIcon = tmpIcon.outerHTML
  }
  return tmpIcon
}

// constructor for states so only curated
// states end up getting called
const State = function(template, EasyButton) {
  this.title = template.title
  this.stateName = template.stateName ? template.stateName : 'unnamed-state'

  // build the wrapper
  this.icon = L.DomUtil.create('span', '')

  L.DomUtil.addClass(this.icon, 'button-state state-' + this.stateName.replace(/(^\s*|\s*$)/g, ''))
  this.icon.innerHTML = buildIcon(template.icon)
  this.onClick = L.Util.bind(template.onClick ? template.onClick : () => {}, easyButton)

}

// this is for grouping buttons into a bar
// takes an array of `L.easyButton`s and
// then the usual `.addTo(map)`

L.Control.EasyBar = L.Control.extend({
  options: {
    position: 'topleft', // part of leaflet's defaults
    id: null, // an id to tag the Bar with
    leafletClasses: true // use leaflet classes?
  },

  initialize(buttons, options) {
    if (options) {
      L.Util.setOptions(this, options)
    }

    this._buildContainer()
    this._buttons = []

    for (let i = 0; i < buttons.length; i++) {
      buttons[i]._bar = this
      buttons[i]._container = buttons[i].button
      this._buttons.push(buttons[i])
      this.container.appendChild(buttons[i].button)
    }
  },
  _buildContainer() {
    this._container = this.container = L.DomUtil.create('div', '')
    if (this.options.leafletClasses) {
      L.DomUtil.addClass(this.container, 'leaflet-bar easy-button-container leaflet-control')
    }
    if (this.options.id) {
      this.container.id = this.options.id
    }
  },
  enable() {
    L.DomUtil.addClass(this.container, 'enabled')
    L.DomUtil.removeClass(this.container, 'disabled')
    this.container.setAttribute('aria-hidden', 'false')
    return this
  },
  disable() {
    L.DomUtil.addClass(this.container, 'disabled')
    L.DomUtil.removeClass(this.container, 'enabled')
    this.container.setAttribute('aria-hidden', 'true')
    return this
  },
  onAdd() {
    const result = this.container
    return result
  },
  addTo(map) {
    this._map = map
    for (let i = 0; i < this._buttons.length; i++) {
      this,_buttons[i]._map = map
    }

    const container = this._container = this.onAdd(map)
    const pos = this.getPosition()
    const corner = map._controlCorners[pos]

    L.DomUtil.addClass(container, 'leaflet-control')

    if (pos.indexOf('bottom') !== -1) {
      corner.insertBefore(container, corner.firstChild)
    } else {
      corner.appendChild(container)
    }

    return this
  }
})

L.easyBar = function(...args) {
  const Args = [L.Control.EasyBar]
  for (let i = 0; i < arguments.length; i++) {
    Args.push(args[i])
  }
  return new (Function.prototype.bind.apply(L.Control.EasyBar, Args))()
}

// L.EasyButton is the actual buttons
// can be called without being grouped into a bar
L.Control.EasyButton = L.Control.extend({
  options: {
    position: 'topleft', // part of leaflet's defaults
    id: null, // an id to tag the button with
    type: 'replace', // [(replace|animate)]
    // replace swaps out elements
    // animate changes classes with all elements inserted
    states: [], // state names look like this
    // {
    //   stateName: 'untracked',
    //   onClick: function() {handle_nav_manually()},
    //   title: 'click to make inactive',
    //   icon: 'fa-circle', // wrapped with <a>
    // }
    leafletClasses: true, // use leaflet styles for the button
    tagName: 'button'
  },
  initialize(icon, onClick, title, id, ...args) {
    // clear the states manually
    this.options.states = []
    // add id to options
    if (id != null) {
      this.options.id = id
    }
    // storage between state functions
    this.storage = {}
    // is the last item an object?
    if (typeof args[args.length - 1] === 'object') {
      // if so, it should be the options
      L.Util.setOptions(this, args[args.length - 1])
    }
    // if there aren't any states in options
    // use the early params
    if (this.options.states.length === 0 && typeof icon === 'string' && typeof onClick === 'function') {
      // turn the options object into a state
      this.options.states.push({
        icon,
        onClick,
        title: typeof title === 'string' ? title : ''
      })
    }

    // curate and move user's states into the _states for internal use 
    this._states = []
    for (let i = 0; i < this.options.length; i++) {
      this._states.push(new State(this.options.states[i], this))
    }
    this._buildButton()
    this._activateState(this._states[0])
  },
  _buildButton() {
    this.button = L.DomUtil.create(this.options.tagName, '')

    if (this.options.tagName === 'button') {
      this.button.setAttribute('type', 'button')
    }
    if (this.options.id) {
      this.button.id = this.options.id
    }
    if (this.options.leafletClasses) {
      L.DomUtil.addClass(this.button, 'easy-button leaflet-bar-part leaflet-interactive')
    }

    // don't let double clicks and mousedown get to hte map
    L.DomEvent.addListener(this.button, 'dbclick', L.DomEvent.stop)
    L.DomEvent.addListener(this.button, 'mousedown', L.DomEvent.stop)

    // take care of normal clicks
    L.DomEvent.addListener(this.button, 'click', function(e) {
      L.DomEvent.stop(e)
      this._currentState.onClick(this, this,_map ? this._map : null)
      if (this._map) {
        this._map.getContainer().focus()
      }
    },this)
    // prep the contents of the control
    if (this.options.type === 'replace') {
      this.button.appendChild(this._currentState.icon)
    } else {
      for (let i = 0; i< this._states.length; i++) {
        this.button.appendChild(this._states[i].icon)
      }
    }
  },
  _currentState: {
    // placeholder content
    stateName: 'unnamed',
    icon: (() => {
      const result = document.createElement('span')
      return result
    })()
  },
  _states: null, // populated on init
  state(newState) {
    // activate by name
    if (typeof newState === 'string') {
      this._activateStateNamed(newState)
    } else if (typeof newState === 'number') {
      this._activateState(this._states[newState])
    }
    return this
  },
  _activateStateNamed(stateName) {
    for (let i = 0; i < this._states.length; i++) {
      if (this._states[i].stateName === stateName) {
        this._activateState(this,_states[i])
      }
    }
  },
  _activateState(newState) {
    if (newState === this._currentState) {
      // don't touch the dom if it'll just be the same after
      return
    } else {
      // swap out elements... if you're into that kind of thing
      if (this.options.type === 'replace') {
        this.button.appendChild(newState.icon)
        this.button.removeChild(this._currentState.icon)
      }
      if (newState.title) {
        this.button.title = newState.title
      } else {
        this.button.removeAttribute('title')
      }
      // update classes for animations
      for (let i = 0; i < this._states.length; i++) {
        L.DomUtil.removeClass(this._states[i].icon, this._currentState.stateName + '-active')
        L.DomUtil.addClass(this._states[i].icon, newState.stateName + '-active')
      }
      // update classes for animations
      L.DomUtil.removeClass(this.button, this._currentState.stateName + '-active')
      L.DomUtil.addClass(this.button, newState.stateName + '-active')
      
      //updata the record
      this._currentState = newState
    }
  },
  enable() {
    L.DomUtil.addClass(this.button, 'enabled')
    L.DomUtil.removeClass(this.button, 'disabled')
    this.button.setAttribute('aria-hidden', 'false')
    return this
  },
  disable() {
    L.DomUtil.addClass(this.button, 'disabled')
    L.DomUtil.removeClass(this.button, 'enabled')
    this.button.setAttribute('aria-hidden', 'true')
    return this
  },
  onAdd(map) {
    const bar = L.easyBar([this], {
      position: this.options.position,
      leafletClasses: this.options.leafletClasses
    })
    this._anonymousBar = bar
    this._container = bar.container
    return this._anonymousBar.container
  },
  removeForm(map) {
    if (this._map === map) {
      this.remove()
      return this
    }
  }
})

L.easyButton = function(...args/** args will pass automatically */) {
  const Args = Array.prototype.concat.apply([L.Control.EasyButton], args)
  return new (Function.prototype.bind.apply(L.Control.EasyButton, args))()
}
</script>
<style lang="scss">
/** leaflet easybutton*/
/* https://github.com/CliffCloud/Leaflet.EasyButton */
.leaflet-bar button,
.leaflet-bar button:hover {
  background-color: #fff;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 26px;
  height: 26px;
  line-height: 26px;
  display: block;
  text-align: center;
  text-decoration: none;
  color: black;
}
.leaflet-bar button {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  overflow: hidden;
  display: block;
}
.leaflet-bar button:hover {
  background: #f4f4f4;
}
.leaflet-bar button:first-of-type {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: none;
}
.leaflet-bar.disabled,
.leaflet-bar button.disabled {
  cursor: default;
  pointer-events: none;
  opacity: .4;
}

.easy-button-button .button-state {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}
.lefalet-touch .leaflet-bar button {
  width: 30px;
  height: 30px;
  line-height: 30px;
}




</style>

