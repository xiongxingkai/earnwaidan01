import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const treeList = []
const count = 100

// const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    // content_short: '我是测试数据',
    // content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    display_time: '@datetime',
    // comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    // image_uri,
    // platforms: ['a-platform']
  }))
}

treeList.push(Mock.mock({
  id: '@increment',
  label: '项目名称',
  type: 'project',
  parentId: '@increment',
  children: [
    {
      id: '@increment',
      label: '合同名称',
      type: 'contract-section',
      parentId: '@increment',
      children: [
        {
          id: '@increment',
          label: '单位名称',
          type: 'unit',
          parentId: '@increment',
          children: [
            {
              id: '@increment',
              label: '分部名称',
              type: 'branch',
              parentId: '@increment',
              children: []
            }
          ]
        }
      ]
    }
  ]
},
{
  id: '@increment',
          label: '分部名称1',
          type: 'contract-section',
          parentId: '@increment',
          children: [
            {
              id: '@increment',
              label: '单位名称1',
              type: 'unit',
              parentId: '@increment',
              children: []
            }
          ]
}
))

export default {
  getList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getTreeList: () => {
    const mockList = treeList
    return mockList
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
    conten_short: '我是测试数据',
    display_time: +new Date(),
    image_url: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  }),
  // getArticle: (config) => {
  //   const { id } = param2Obj(config.url)
  //   for (const article of List) {
  //     if (article.id === +id) {
  //       return article
  //     }
  //   }
  // },
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
