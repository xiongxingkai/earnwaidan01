import request from '@/utils/request'

// 组织树
export function getTree(str) {
  if (str !== '' && str !== undefined && str !== null) {
    return request({
      url: '/api/hr/hr/dept/tree?queryString=' + str, 
      method: 'get'
    })
  } else {
    return request({
      url: '/api/hr/hr/dept/tree', 
      method: 'get'
    })
  }
}

// 组织树
export function getEmpTree(str) {
  if (str !== '' && str !== undefined && str !== null) {
    return request({
      url: '/api/hr/hr/employee/tree?queryString=' + str, 
      method: 'get'
    })
  } else {
    return request({
      url: '/api/hr/hr/employee/tree', 
      method: 'get'
    })
  }
}

// 信息维护初始数据
export function page(query) {
  return request({
    url: '/api/hr/hr/employee/page',  
    method: 'post',
    data: query
  })
}

// 人资审核
export function hrcheck(obj) {
  return request({
    url: '/api/hr/hr/employee/audit',  
    method: 'post',
    data: obj
  })
}

// 详情
export function hrcheck(id) {
  return request({
    url: '/api/hr/hr/employee/' + id,  
    method: 'get'
  })
}

// 字典
export function getDict() {
  return request({
    url: '/api/hr/dict/names',  
    method: 'get'
  })
}

// 基本信息
export function addNewpersonBase(obj) {
  return request({
    url: '/api/hr/hr/employee',  
    method: 'post',
    data: obj
  })
}

export function updateNewpersonBase(obj) {
  return request({
    url: '/api/hr/hr/employee',  
    method: 'put',
    data: obj
  })
}

// 获取工号
export function getNum(empType) {
  return request({
    url: '/api/hr/hr/employee/getNum/' + empType,  
    method: 'get'
  })
}

// 教育模块
export function addEdu(obj) {
  return request({
    url: '/api/hr/hr/education',  
    method: 'post',
    data: obj
  })
}

export function updateEdu(obj) {
  return request({
    url: '/api/hr/hr/education',  
    method: 'put',
    data: obj
  })
}

export function queryEduList(id) {
  return request({
    url: '/api/hr/hr/education/list/' + id,  
    method: 'get'
  })
}

export function deletEdu(id) {
  return request({
    url: '/api/hr/hr/education/list/' + id,  
    method: 'delete'
  })
}

export function editEdu(id) {
  return request({
    url: '/api/hr/hr/education/list/' + id,  
    method: 'get'
  })
}

// 工作经历模块
export function addWorkExperience(obj) {
  return request({
    url: '/api/hr/hr/workExperience',  
    method: 'post',
    data: obj
  })
}

export function updateWorkExperience(obj) {
  return request({
    url: '/api/hr/hr/workExperience',  
    method: 'put',
    data: obj
  })
}

export function queryWorkpList(id) {
  return request({
    url: '/api/hr/hr/workExperience/list/' + id,  
    method: 'get'
  })
}

export function deletWorkP(id) {
  return request({
    url: '/api/hr/hr/workExperience/' + id,  
    method: 'delete'
  })
}

export function editWorkP(id) {
  return request({
    url: '/api/hr/hr/workExperience/' + id,  
    method: 'get'
  })
}

// 政治面貌模块
export function addPolitical(obj) {
  return request({
    url: '/api/hr/hr/political',  
    method: 'post',
    data: obj
  })
}

export function updatePolitical(obj) {
  return request({
    url: '/api/hr/hr/political',  
    method: 'put',
    data: obj
  })
}

export function queryPoliticalList(id) {
  return request({
    url: '/api/hr/hr/political/list/' + id,  
    method: 'get'
  })
}

export function deletPolitical(id) {
  return request({
    url: '/api/hr/hr/political/' + id,  
    method: 'delete'
  })
}

export function editPolitical(id) {
  return request({
    url: '/api/hr/hr/political/' + id,  
    method: 'get'
  })
}

// 家庭成员模块
export function addFamily(obj) {
  return request({
    url: '/api/hr/hr/family',  
    method: 'post',
    data: obj
  })
}

export function updateFamily(obj) {
  return request({
    url: '/api/hr/hr/family',  
    method: 'put',
    data: obj
  })
}

export function queryFamilyList(id) {
  return request({
    url: '/api/hr/hr/family/list/' + id,  
    method: 'get'
  })
}

export function deletFamily(id) {
  return request({
    url: '/api/hr/hr/family/' + id,  
    method: 'delete'
  })
}

export function editFamily(id) {
  return request({
    url: '/api/hr/hr/family/' + id,  
    method: 'get'
  })
}

// 职称模块
export function addProfessional(obj) {
  return request({
    url: '/api/hr/hr/professional',  
    method: 'post',
    data: obj
  })
}

export function updateProfessional(obj) {
  return request({
    url: '/api/hr/hr/professional',  
    method: 'put',
    data: obj
  })
}

export function queryProfessionalList(id) {
  return request({
    url: '/api/hr/hr/professional/list/' + id,  
    method: 'get'
  })
}

export function deletProfessional(id) {
  return request({
    url: '/api/hr/hr/professional/' + id,  
    method: 'delete'
  })
}

export function editProfessional(id) {
  return request({
    url: '/api/hr/hr/professional/' + id,  
    method: 'get'
  })
}

// 执业资格模块
export function addQualification(obj) {
  return request({
    url: '/api/hr/hr/qualification',  
    method: 'post',
    data: obj
  })
}

export function updateQualification(obj) {
  return request({
    url: '/api/hr/hr/qualification',  
    method: 'put',
    data: obj
  })
}

export function queryQualificationList(id) {
  return request({
    url: '/api/hr/hr/qualification/list/' + id,  
    method: 'get'
  })
}

export function deletQualification(id) {
  return request({
    url: '/api/hr/hr/qualification/' + id,  
    method: 'delete'
  })
}

export function editQualification(id) {
  return request({
    url: '/api/hr/hr/qualification/' + id,  
    method: 'get'
  })
}

// 劳动合同模块
export function addContract(obj) {
  return request({
    url: '/api/hr/hr/contract',  
    method: 'post',
    data: obj
  })
}

export function updateContract(obj) {
  return request({
    url: '/api/hr/hr/contract',  
    method: 'put',
    data: obj
  })
}

export function queryContractList(id) {
  return request({
    url: '/api/hr/hr/contract/list/' + id,  
    method: 'get'
  })
}

export function deletContract(id) {
  return request({
    url: '/api/hr/hr/contract/' + id,  
    method: 'delete'
  })
}

export function editContract(id) {
  return request({
    url: '/api/hr/hr/contract/' + id,  
    method: 'get'
  })
}

// 工资账户模块
export function addAccount(obj) {
  return request({
    url: '/api/hr/hr/salaryAccount',  
    method: 'post',
    data: obj
  })
}

export function updateAccount(obj) {
  return request({
    url: '/api/hr/hr/salaryAccount',  
    method: 'put',
    data: obj
  })
}

export function queryAccountList(id) {
  return request({
    url: '/api/hr/hr/salaryAccount/list/' + id,  
    method: 'get'
  })
}

export function deletAccount(id) {
  return request({
    url: '/api/hr/hr/salaryAccount/' + id,  
    method: 'delete'
  })
}

export function editAccount(id) {
  return request({
    url: '/api/hr/hr/salaryAccount/' + id,  
    method: 'get'
  })
}

// 内部任职模块
export function addAppointment(obj) {
  return request({
    url: '/api/hr/hr/appointment',  
    method: 'post',
    data: obj
  })
}

export function updateAppointment(obj) {
  return request({
    url: '/api/hr/hr/appointment',  
    method: 'put',
    data: obj
  })
}

export function queryAppointmentList(id) {
  return request({
    url: '/api/hr/hr/appointment/list/' + id,  
    method: 'get'
  })
}

export function deletAppointment(id) {
  return request({
    url: '/api/hr/hr/appointment/' + id,  
    method: 'delete'
  })
}

export function editAppointment(id) {
  return request({
    url: '/api/hr/hr/appointment/' + id,  
    method: 'get'
  })
}

// 获奖模块
export function addAward(obj) {
  return request({
    url: '/api/hr/hr/award',  
    method: 'post',
    data: obj
  })
}

export function updateAward(obj) {
  return request({
    url: '/api/hr/hr/award',  
    method: 'put',
    data: obj
  })
}

export function queryAwardList(id) {
  return request({
    url: '/api/hr/hr/award/list/' + id,  
    method: 'get'
  })
}

export function deletAward(id) {
  return request({
    url: '/api/hr/hr/award/' + id,  
    method: 'delete'
  })
}

export function editAward(id) {
  return request({
    url: '/api/hr/hr/award/' + id,  
    method: 'get'
  })
}

// 紧急联系人
export function addContact(obj) {
  return request({
    url: '/api/hr/hr/contact',  
    method: 'post',
    data: obj
  })
}

export function updateContact(obj) {
  return request({
    url: '/api/hr/hr/contact',  
    method: 'put',
    data: obj
  })
}

export function queryContactList(id) {
  return request({
    url: '/api/hr/hr/contact/list/' + id,  
    method: 'get'
  })
}

export function deletContact(id) {
  return request({
    url: '/api/hr/hr/contact/' + id,  
    method: 'delete'
  })
}

export function editContact(id) {
  return request({
    url: '/api/hr/hr/contact/' + id,  
    method: 'get'
  })
}

// 录用通知模块
export function queryOfferList(obj) {
  return request({
    url: '/api/hr/offer/page',  
    method: 'post',
    data: obj
  })
}

// 保存
export function saveOffer(obj) {
  return request({
    url: '/api/hr/offer',  
    method: 'post',
    data: obj
  })
}

// 发送
export function sendOffers(obj) {
  return request({
    url: '/api/hr/offer/single',  
    method: 'post',
    data: obj
  })
}

// 获取人员信息ID
export function getEmployeeId(obj) {
  return request({
    url: '/api/hr/offer/getEmployeeId/token',  
    method: 'post',
    data: { token: obj }
  })
}

// 根据人员信息ID修改提交状态
export function getDataByEmployee(id) {
  return request({
    url: '/api/hr/offer/commit/' + id,  
    method: 'get'
  })
}

export function sentOffer(idsArr) {
  return request({
    url: '/api/hr/offer/send',  
    method: 'post',
    data: idsArr
  })
}

export function deleteOffer(id) {
  return request({
    url: '/api/hr/offer/' + id,  
    method: 'delete'
  })
}

export function updateOffer(id) {
  return request({
    url: '/api/hr/offer/' + id,  
    method: 'get'
  })
}

export function testPhone(phone) {
  return request({
    url: '/api/hr/offer/verify/' + phone,  
    method: 'get'
  })
}

// 部门信息模块
export function getDeptList(str) {
  if (str !== '' && str !== undefined && str !== null) {
    return request({
      url: '/api/hr/hr/dept/list?deptNum=' + str,  
      method: 'get'
    })
  } else {
    return request({
      url: '/api/hr/hr/dept/list',  
      method: 'get'
    })
  }
}

export function getDeptInfo(deptId) {
  return request({
    url: '/api/hr/hr/dept/' + deptId,  
    method: 'get'
  })
}

export function updateDeptInfo(infoObj) {
  return request({
    url: '/api/hr/hr/dept',  
    method: 'put',
    data: infoObj
  })
}

export function addDeptInfo(infoObj) {
  return request({
    url: '/api/hr/hr/dept',  
    method: 'post',
    data: infoObj
  })
}

export function queryDeptNumber(num) {
  return request({
    url: '/api/hr/hr/dept/verify/' + num,  
    method: 'get'
  })
}

export function queryFdeptNumber(num) {
  return request({
    url: '/api/hr/hr/dept/verifyFdeptNum/' + num,  
    method: 'get'
  })
}

export function queryMdeptNumber(num) {
  return request({
    url: '/api/hr/hr/dept/verifyMdeptNum/' + num,  
    method: 'get'
  })
}

export function delDeptInfo(id) {
  return request({
    url: '/api/hr/hr/dept/' + id,  
    method: 'delete'
  })
}

// 人员分布
export function queryPlaceList() {
  return request({
    url: '/api/hr/report/place',  
    method: 'get'
  })
}

export function queryPlace(str) {
  return request({
    url: '/api/hr/report/search/?name=' + str,  
    method: 'get'
  })
}


// 内部调用经历
// 初始化
export function getTransferDetail(RowId) {
  return request({
    url: '/api/hr/employee-dispatch-record/records/' + RowId,  
    method: 'get'
  })
}

// 新增
export function addTransferData(formData) {
  return request({
    url: '/api/hr/employee-dispatch-record',  
    method: 'post',
    data: formData
  })
}

// 编辑详情
export function getTransfer(RowId) {
  return request({
    url: '/api/hr/employee-dispatch-record/' + RowId,  
    method: 'get'
  })
}

// 编辑保存
export function getTransferSvae(forms) {
  return request({
    url: '/api/hr/employee-dispatch-record',  
    method: 'put',
    data: forms
  })
}

// 删除
export function delTransferData(RowId) {
  return request({
    url: '/api/hr/employee-dispatch-record/' + RowId,  
    method: 'delete'
  })
}

// 刷新接口
export function getTransferPage(RowId) {
  return request({
    url: '/api/hr/employee-dispatch-record/records/' + RowId,  
    method: 'get'
  })
}

// 人员信息维护导出
export function PersonnelExport(query) {
  return request({
    url: '/api/hr/hr/employee/export',  
    method: 'post',
    responseType: 'arraybuffer',
    data: query
  })
}

// 模板导出
export function getContract(employeeId) {
  return request({
    url: '/api/hr/fineReport/contract/' + employeeId,  
    method: 'get'
  })
}

// 文件导出
export function GetExport(obj) {
  return request({
    url: '/api/file-server/FineReport',  
    method: 'post',
    responseType: 'arraybuffer',
    data: obj
  })
}

// 获取文件记录
export function getMultiple(obj) {
  return request({
    url: '/api/file-server/files/multiple/' + obj,  
    method: 'get'
  })
}

// 获取文件下载地址
export function getDownload(objectName) {
  return request({
    url: '/api/file-server/oss/download',  
    method: 'get',
    params: { objectName }
  })
}

// 根据用户名获取用户信息
export function selectByUserName(userName) {
  return request({
    url: '/api/hr/offer/getUserName/' + userName,  
    method: 'get'
  })
}


