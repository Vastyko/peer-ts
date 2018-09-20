// file-logger, [2018-09-20--09:33:57]


import { Spore } from "../http/region";
import { checki } from "../../utils/checkOperator";
type integer = number;
// 2.1.1 获取授权码
 export namespace getTokenTypes {
  export type path = {  
'response_type' : string; // 固定参数
  'scope' : string; // 固定参数
  'client_id' : string; // 客户端 id，向账号系统申请
  'redirect_uri' : string; // 表示重定向回调地址的uri。uri必须符合创建客户端时的callbackUri设置规则。
  'state' : string; // 状态，任意值。账号系统会原封不动返回这个值
  'platform' : string; // 平台，用于给前端进行UI适配。app：移动客户端，pc-app：桌面客户端，maxhub：MAXHUB，web：桌面端浏览器，weixin：移动端微信，mobile：移动端浏览器。默认显示移动端微信版面。
};
 export type query = {};
 export type header = {};
 export type body = {};
// 200
export type response = {}
// 
export type ominous = {}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 2.2.1 登录
 export namespace loginTypes {
  export type path = {  
'code' : string; // 账号服务器回调的授权码
};
 export type query = {};
 export type header = {};
 export type body = {};
// 200
export type response = {
_id : string; // 用户 id
systemId : string; // 对应账号系统的 id
access_token : string; // 用户访问令牌
refresh_token : string; // 刷新令牌，用于刷新访问令牌的有效期
expires_in : string; // 令牌有效期，单位秒。一般为1209600，即14天。
token_type : string; // 令牌类型
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 3.1.1 查询用户信息
 export namespace searchPersonTypes {
  export type path = {  
'mobile' : string; // 通过手机号查询，和邮箱互斥
  'email' : string; // 通过邮箱查询，和手机号互斥
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 3.2.1 配置邮箱
 export namespace setEmailTypes {
  export type path = {  
'userId' : string; // 用户 id
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
email : string; // 邮箱
username : string; // 邮箱的用户名base64编码，不填写则默认提取邮箱的名称
password : string; // 邮箱的密码
smtpServer : string; // 发件服务器
smtpPort : number; // 发件服务器端口
};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 3.3.1 查询我的会议列表
 export namespace getMeetingListTypes {
  export type path = {  
'userId' : string; 
  'state' : number; 
  'page' : number; 
  'row' : number; 
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
user : string; // 用户 id
meeting : {
_id : string; // 会议 id
subject : string; // 会议主题
content : string; // 会议的内容描述
beginTime : string; // 会议开始时间
endTime : string; // 会议结束时间
address : string; // 会议地点
masterId : string; // 主持人 id
shareId : string; // 云盘共享空间 id
accessKey : string; // 共享空间的访问秘钥
state : integer; 
members : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
meeting : string; // 会议 id
createTime : string; // 加入会议的时间
state : integer; 
from : integer; 
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
repeatMeeting : string; // 关联的重复会议 id
order : {
orderNo : string; // 订单 id
room : string; // 会议室 id
startTime : number; // 开始时间
endTime : number; // 结束时间
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
description : string; // 订单描述
}; 
}; 
member : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
meeting : string; // 会议 id
createTime : string; // 加入会议的时间
state : integer; 
from : integer; 
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}; 
noteContent : string; // 我的会议笔记
noteSubject : string; // 我的会议笔记主题
inviteState : integer; 
summaryState : integer; 
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]

// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 3.4.2 删除会议记录
 export namespace deletMeetingRecordTypes {
  export type path = {  
'userId' : string; 
  'meetingId' : string; 
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const del = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).del
}

// 3.4.1 更新笔记
 export namespace updateNoteTypes {
  export type path = {  
'userId' : string; 
  'meetingId' : string; 
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
noteContent : string; // 更新我的笔记内容
noteSubject : string; // 更新我的笔记主题
};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 3.4.3 已读会议纪要
 export namespace summaryReadTypes {
  export type path = {  
'userId' : string; 
  'meetingId' : string; 
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 4.1.1 预约会议
 export namespace scheduleMeetingTypes {
  export type path = {};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
subject : string; // 会议标题
content : string; // 会议内容
beginTime : number; // 会议开始时间，unix时间戳，单位毫秒
endTime : number; // 会议结束时间，unix时间戳，单位毫秒
address : string; // 会议地点
members : {
mobiles : string[]
; // 通过手机添加
emails : string[]
; // 通过邮箱添加
ids : string[]
; // 通过 id 添加，未注册的 id 将被忽略
}; 
attachments : string[]
; 
};
// 201
export type response = {
_id : string; // 会议 id
subject : string; // 会议主题
content : string; // 会议的内容描述
beginTime : string; // 会议开始时间
endTime : string; // 会议结束时间
address : string; // 会议地点
masterId : string; // 主持人 id
shareId : string; // 云盘共享空间 id
accessKey : string; // 共享空间的访问秘钥
state : integer; 
members : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
meeting : string; // 会议 id
createTime : string; // 加入会议的时间
state : integer; 
from : integer; 
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
repeatMeeting : string; // 关联的重复会议 id
order : {
orderNo : string; // 订单 id
room : string; // 会议室 id
startTime : number; // 开始时间
endTime : number; // 结束时间
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
description : string; // 订单描述
}; 
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 4.1.2 即时会议
 export namespace imediateMeetingTypes {
  export type path = {};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 201
export type response = {
_id : string; // 会议 id
subject : string; // 会议主题
content : string; // 会议的内容描述
beginTime : string; // 会议开始时间
endTime : string; // 会议结束时间
address : string; // 会议地点
masterId : string; // 主持人 id
shareId : string; // 云盘共享空间 id
accessKey : string; // 共享空间的访问秘钥
state : integer; 
members : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
meeting : string; // 会议 id
createTime : string; // 加入会议的时间
state : integer; 
from : integer; 
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
repeatMeeting : string; // 关联的重复会议 id
order : {
orderNo : string; // 订单 id
room : string; // 会议室 id
startTime : number; // 开始时间
endTime : number; // 结束时间
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
description : string; // 订单描述
}; 
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 4.2.1 查询会议信息
 export namespace searchMeetingMessageTypes {
  export type path = {  
'meetingId' : string; // 会议ID
};
 export type query = {};
 export type header = {};
 export type body = {};
// 200
export type response = {
_id : string; // 会议 id
subject : string; // 会议主题
content : string; // 会议的内容描述
beginTime : string; // 会议开始时间
endTime : string; // 会议结束时间
address : string; // 会议地点
masterId : string; // 主持人 id
shareId : string; // 云盘共享空间 id
accessKey : string; // 共享空间的访问秘钥
state : integer; 
members : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
meeting : string; // 会议 id
createTime : string; // 加入会议的时间
state : integer; 
from : integer; 
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
repeatMeeting : string; // 关联的重复会议 id
order : {
orderNo : string; // 订单 id
room : string; // 会议室 id
startTime : number; // 开始时间
endTime : number; // 结束时间
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
description : string; // 订单描述
}; 
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 4.2.2 修改会议信息
 export namespace modifyMeetingMeesageTypes {
  export type path = {  
'meetingId' : string; // 会议ID
};
 export type query = {};
 export type header = {};
 export type body = {
subject : string; // 会议主题
content : string; // 会议的内容描述
beginTime : number; // 会议开始时间
endTime : number; // 会议结束时间
address : string; // 会议地点
};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 4.2.3 取消会议/取消预约
 export namespace cancelScheduleTypes {
  export type path = {  
'meetingId' : string; // 会议ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 4.2.4 结束会议
 export namespace endTheMeetingTypes {
  export type path = {  
'meetingId' : string; // 会议ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 4.3.1 邀请与会人员
 export namespace inviteMeetingMembersTypes {
  export type path = {  
'meetingId' : string; // 会议ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
mobiles : string[]
; // 通过手机添加
emails : string[]
; // 通过邮箱添加
ids : string[]
; // 通过 id 添加，未注册的 id 将被忽略
};
// 200
export type response = {
_id : string; // 会议 id
subject : string; // 会议主题
content : string; // 会议的内容描述
beginTime : string; // 会议开始时间
endTime : string; // 会议结束时间
address : string; // 会议地点
masterId : string; // 主持人 id
shareId : string; // 云盘共享空间 id
accessKey : string; // 共享空间的访问秘钥
state : integer; 
members : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
meeting : string; // 会议 id
createTime : string; // 加入会议的时间
state : integer; 
from : integer; 
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
repeatMeeting : string; // 关联的重复会议 id
order : {
orderNo : string; // 订单 id
room : string; // 会议室 id
startTime : number; // 开始时间
endTime : number; // 结束时间
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
description : string; // 订单描述
}; 
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 4.4.1 退出会议
 export namespace exitMeetingTypes {
  export type path = {  
'meetingId' : string; // 会议ID
  'memberId' : string; // 用户ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const del = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).del
}

// 4.4.2 确认/拒绝邀请
 export namespace confirmInivitingTypes {
  export type path = {  
'meetingId' : string; 
  'memberId' : string; 
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
state : number; // 邀请状态，1为拒绝，2为确认
};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 4.4.1 查询附件信息
 export namespace searchAdjunctTypes {
  export type path = {  
'meetingid' : string; // 会议ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
downloadUrl : string; // 附件地址
_id : string; // 附件存储在云盘的 id
meeting : string; 
name : string; 
createTime : string; // 文件上传时间
contentType : string; // 文件类型
size : string; // 文件大小（字节）
}[]

// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 4.4.2 上传附件
 export namespace uploadAdjunctTypes {
  export type path = {  
'meetingid' : string; // 会议ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
downloadUrl : string; // 附件地址
_id : string; // 附件存储在云盘的 id
meeting : string; 
name : string; 
createTime : string; // 文件上传时间
contentType : string; // 文件类型
size : string; // 文件大小（字节）
}[]
;
// 201
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 4.4.3 删除附件
 export namespace deleteAdjunctTypes {
  export type path = {  
'id' : string; // 会议ID
  'shareId' : string; // 在云盘的 id
};
 export type query = {  
'meetingid' : string; // 会议ID
};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const del = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).del
}

// 5.1.1 发布会议纪要
 export namespace publishSummaryTypes {
  export type path = {  
'meetingId' : string; // 会议ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
subject : string; // 会议纪要标题
content : string; // 会议纪要内容
};
// 201
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 5.1.4 获取会议纪要
 export namespace getMeetingSummaryTypes {
  export type path = {  
'meetingId' : string; // 会议ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
_id : string; // 会议 id
subject : string; // 会议纪要主题
content : string; // 会议纪要内容
state : integer; 
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 5.1.2 更新会议纪要
 export namespace updateMeetingSummaryTypes {
  export type path = {  
'meetingId' : string; // 会议ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
subject : string; // 会议纪要标题
content : string; // 会议纪要内容
};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 5.1.3 分享会议纪要
 export namespace shareMeetingSummaryTypes {
  export type path = {  
'meetingId' : string; // 会议ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = string;
// 201
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 6.1.2 查询联系人列表
 export namespace getContactListTypes {
  export type path = {  
'userId' : string; // 用户 id
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
person : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
from : integer; 
remark : string; // 备注
createTime : number; // 创建时间
userId : string; // 所属用户 id
}[]

// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 6.1.1 添加联系人
 export namespace addContactPersonTypes {
  export type path = {  
'userId' : string; // 用户 id
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
mobile : string; // 通过手机添加
email : string; // 通过邮箱添加
};
// 201
export type response = {
person : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
from : integer; 
remark : string; // 备注
createTime : number; // 创建时间
userId : string; // 所属用户 id
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 6.2.1 删除联系人
 export namespace deleteContactPersonTypes {
  export type path = {  
'userId' : string; // 用户 id
  'personId' : string; // 联系人 id
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const del = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).del
}

// 6.2.2 修改备注
 export namespace remarkPersonTypes {
  export type path = {  
'userId' : string; // 用户 id
  'personId' : string; // 联系人 id
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 6.3.1 获取我的团队列表
 export namespace getTeamListTypes {
  export type path = {  
'userId' : string; // 用户 id
  'page' : number; // 数据分页（本期暂不实现）
  'row' : number; // 每页数据数量（本期暂不实现）
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
_id : string; // 团队 id
name : string; // 团队名称
createTime : number; // 创建时间
masterId : string; // 创建者 id
members : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
from : integer; 
createTime : string; // 成员加入时间
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
}[]

// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 7.1.1 创建团队
 export namespace createTeamTypes {
  export type path = {};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
name : string; // 团队名称
};
// 200
export type response = {
_id : string; // 团队 id
name : string; // 团队名称
createTime : number; // 创建时间
masterId : string; // 创建者 id
members : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
from : integer; 
createTime : string; // 成员加入时间
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 7.2.1 查询团队信息
 export namespace searchTeamTypes {
  export type path = {};
 export type query = {  
'teamId' : string; // 团队 id
};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
_id : string; // 团队 id
name : string; // 团队名称
createTime : number; // 创建时间
masterId : string; // 创建者 id
members : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
from : integer; 
createTime : string; // 成员加入时间
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 7.2.2 修改团队信息
 export namespace patchTeamTypes {
  export type path = {};
 export type query = {  
'teamId' : string; // 团队 id
};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 7.3.1 邀请团队成员
 export namespace inviteTeamMembersTypes {
  export type path = {  
'teamId' : string; // 团队 ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
mobiles : string[]
; // 通过手机添加
emails : string[]
; // 通过邮箱添加
ids : string[]
; // 通过 id 添加，未注册的 id 将被忽略
};
// 200
export type response = {
_id : string; // 团队 id
name : string; // 团队名称
createTime : number; // 创建时间
masterId : string; // 创建者 id
members : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
from : integer; 
createTime : string; // 成员加入时间
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
failUsers : {
email : string; // 邮箱
}[]
; 
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 7.3.2 加入团队
 export namespace joinTeamTypes {
  export type path = {  
'teamId' : string; // 团队 ID
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
_id : string; // 团队 id
name : string; // 团队名称
createTime : number; // 创建时间
masterId : string; // 创建者 id
members : {
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
from : integer; 
createTime : string; // 成员加入时间
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 7.2.3 退出团队
 export namespace exitTeamTypes {
  export type path = {  
'teamId' : string; // 团队 ID
  'userId' : string; // 当前用户 id
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 204
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const del = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).del
}

// 8.1.1 查询发送给自己的消息
 export namespace getShelfMessageTypes {
  export type path = {  
'userId' : string; 
  'noAck' : boolean; // true 则只查询未读的消息
  'page' : number; // 消息的页数，page 和 row 必须同时设置（当前版本暂不实现）
  'row' : number; // 每页消息的个数，page 和 row 必须同时设置（当前版本暂不实现）
};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
_id : string; // 通知 id
content : string; // 消息内容
type : integer; 
ack : string; // 是否接收到消息
}[]

// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 9.1.1 查询操作记录
 export namespace getOperationLogTypes {
  export type path = {};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
attribute : string; // 修改的属性/对象
preValue : string; // 修改前的值
curValue : string; // 修改后的值
meetingId : string; // 会议 id
modifyUserId : string; // 修改人 id
}[]

// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 10.1.1 创建重复会议
 export namespace 创建重复会议Types {
  export type path = {};
 export type query = {};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
subject : string; // 会议标题
content : string; // 会议内容
beginTime : number; // 首次会议开始时间，unix时间戳，单位毫秒
endTime : number; // 首次会议结束时间，unix时间戳，单位毫秒
address : string; // 会议地点
roomId : string; // 会议室 id
members : {
mobiles : string[]
; // 通过手机添加
emails : string[]
; // 通过邮箱添加
ids : string[]
; // 通过 id 添加，未注册的 id 将被忽略
}; 
repeatEndTime : number; // 重复会议结束时时间，unix时间戳，单位毫秒
repeatType : number; // 重复类型，0为日，1为周
repeatValue : number; // 如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7
};
// 201
export type response = {
subject : string; // 会议标题
content : string; // 会议内容
beginTime : number; // 首次会议开始时间，unix时间戳，单位毫秒
endTime : number; // 首次会议结束时间，unix时间戳，单位毫秒
address : string; // 会议地点
room : {
id : string; // 会议室 id
name : string; // 会议室名称
area : string; // 会议室所在区域
description : string; // 会议室描述
}; 
members : {
_id : string; // 重复会议与会人员 id
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
repeatMeeting : string; // 关联的重复会议
from : integer; 
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
repeatEndTime : number; // 重复会议结束时时间，unix时间戳，单位毫秒
repeatType : number; // 重复类型，0为日，1为周
repeatValue : number; // 如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7
master : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
creator : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
state : number; // 重复会议状态，0为使用中，1为取消
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 10.2.3 查询重复会议信息
 export namespace 查询重复会议信息Types {
  export type path = {};
 export type query = {  
'repeat_meeting_id' : string; // 重复会议 id
};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {
subject : string; // 会议标题
content : string; // 会议内容
beginTime : number; // 首次会议开始时间，unix时间戳，单位毫秒
endTime : number; // 首次会议结束时间，unix时间戳，单位毫秒
address : string; // 会议地点
room : {
id : string; // 会议室 id
name : string; // 会议室名称
area : string; // 会议室所在区域
description : string; // 会议室描述
}; 
members : {
_id : string; // 重复会议与会人员 id
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
repeatMeeting : string; // 关联的重复会议
from : integer; 
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
repeatEndTime : number; // 重复会议结束时时间，unix时间戳，单位毫秒
repeatType : number; // 重复类型，0为日，1为周
repeatValue : number; // 如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7
master : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
creator : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
state : number; // 重复会议状态，0为使用中，1为取消
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const get = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).get
}

// 10.2.1 取消会议
 export namespace 取消会议Types {
  export type path = {};
 export type query = {  
'repeat_meeting_id' : string; // 重复会议 id
};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {};
// 200
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const del = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).del
}

// 10.2.2 修改重复会议信息
 export namespace 修改重复会议信息Types {
  export type path = {};
 export type query = {  
'repeat_meeting_id' : string; // 重复会议 id
};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
subject : string; // 会议标题
content : string; // 会议内容
beginTime : number; // 首次会议开始时间，unix时间戳，单位毫秒
endTime : number; // 首次会议结束时间，unix时间戳，单位毫秒
address : string; // 会议地点
roomId : string; // 会议室 id
repeatEndTime : number; // 重复会议结束时时间，unix时间戳，单位毫秒
repeatType : number; // 重复类型，0为日，1为周
repeatValue : number; // 如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7
};
// 200
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const patch = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).patch
}

// 10.3.1 添加重复会议成员
 export namespace 添加重复会议成员Types {
  export type path = {};
 export type query = {  
'repeat_meeting_id' : string; // 重复会议 id
};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
mobiles : string[]
; // 通过手机添加
emails : string[]
; // 通过邮箱添加
ids : string[]
; // 通过 id 添加，未注册的 id 将被忽略
};
// 201
export type response = {
subject : string; // 会议标题
content : string; // 会议内容
beginTime : number; // 首次会议开始时间，unix时间戳，单位毫秒
endTime : number; // 首次会议结束时间，unix时间戳，单位毫秒
address : string; // 会议地点
room : {
id : string; // 会议室 id
name : string; // 会议室名称
area : string; // 会议室所在区域
description : string; // 会议室描述
}; 
members : {
_id : string; // 重复会议与会人员 id
user : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
repeatMeeting : string; // 关联的重复会议
from : integer; 
invitor : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
}[]
; 
repeatEndTime : number; // 重复会议结束时时间，unix时间戳，单位毫秒
repeatType : number; // 重复类型，0为日，1为周
repeatValue : number; // 如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7
master : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
creator : {
_id : string; // 用户 id
email : string; // 邮箱
mobile : string; // 手机号
createTime : string; // 用户创建时间
isMailConfig : string; // 邮箱是否配置
avatar : string; // 头像地址
displayName : string; // 用户昵称
systemId : string; // 对应账号系统的 id
}; 
state : number; // 重复会议状态，0为使用中，1为取消
}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const post = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).post
}

// 10.4.1 退出重复会议
 export namespace 退出重复会议Types {
  export type path = {};
 export type query = {  
'repeat_meeting_id' : string; // 重复会议 id
  'repeat_meeting_member_id' : string; // 重复会议成员 userId
};
 export type header = {  
// 'Content-Type' : string; 
};
 export type body = {
mobiles : string[]
; // 通过手机添加
emails : string[]
; // 通过邮箱添加
ids : string[]
; // 通过 id 添加，未注册的 id 将被忽略
};
// 200
export type response = {}
// 400|default
export type ominous = {
code : number; // 错误码
message : string; // 错误内容
} | {
code : number; // 错误码
message : string; // 错误内容
}
export type checked = checki<ominous> | checki<response>
export const del = (apiUrl:string) => Spore<path & query, body, header, response>(apiUrl).del
}export const auto = {
 
// 2.1.1 获取授权码
getToken : getTokenTypes.get("/api/pauth/authorize?response_type={response_type}&scope={scope}&client_id={client_id}&redirect_uri={redirect_uri}&state={state}&platform={platform}"),
 
// 2.2.1 登录
login : loginTypes.post("/api/pauth/token?code={code}&grant_type=authorization"),
 
// 3.1.1 查询用户信息
searchPerson : searchPersonTypes.get("/api/users?mobile={mobile}&email={email}"),
 
// 3.2.1 配置邮箱
setEmail : setEmailTypes.patch("/api/users/{userId}/actions/config_mail"),
 
// 3.3.1 查询我的会议列表
getMeetingList : getMeetingListTypes.get("/api/users/{userId}/meeting_records?page={page}&row={row}&state={state}"),
 
// 3.4.2 删除会议记录
deletMeetingRecord : deletMeetingRecordTypes.del("/api/users/{userId}/meeting_records/{meetingId}"),
 
// 3.4.1 更新笔记
updateNote : updateNoteTypes.patch("/api/users/{userId}/meeting_records/{meetingId}"),
 
// 3.4.3 已读会议纪要
summaryRead : summaryReadTypes.patch("/api/users/{userId}/meeting_records/{meetingId}/state/read"),
 
// 4.1.1 预约会议
scheduleMeeting : scheduleMeetingTypes.post("/api/meetings/actions/schedule"),
 
// 4.1.2 即时会议
imediateMeeting : imediateMeetingTypes.post("/api/meetings/actions/immediate"),
 
// 4.2.1 查询会议信息
searchMeetingMessage : searchMeetingMessageTypes.get("/api/meetings/{meetingId}"),
 
// 4.2.2 修改会议信息
modifyMeetingMeesage : modifyMeetingMeesageTypes.patch("/api/meetings/{meetingId}"),
 
// 4.2.3 取消会议/取消预约
cancelSchedule : cancelScheduleTypes.patch("/api/meetings/{meetingId}/state/cancel"),
 
// 4.2.4 结束会议
endTheMeeting : endTheMeetingTypes.patch("/api/meetings/{meetingId}/state/finish"),
 
// 4.3.1 邀请与会人员
inviteMeetingMembers : inviteMeetingMembersTypes.post("/api/meetings/{meetingId}/members"),
 
// 4.4.1 退出会议
exitMeeting : exitMeetingTypes.del("/api/meetings/{meetingId}/members/{memberId}"),
 
// 4.4.2 确认/拒绝邀请
confirmIniviting : confirmInivitingTypes.patch("/api/meetings/{meetingId}/members/{memberId}"),
 
// 4.4.1 查询附件信息
searchAdjunct : searchAdjunctTypes.get("/api/meetings/{meetingid}/attachments"),
 
// 4.4.2 上传附件
uploadAdjunct : uploadAdjunctTypes.post("/api/meetings/{meetingid}/attachments"),
 
// 4.4.3 删除附件
deleteAdjunct : deleteAdjunctTypes.del("/api/meetings/{id}/attachments/{shareId}"),
 
// 5.1.1 发布会议纪要
publishSummary : publishSummaryTypes.patch("/api/meeting_summaries/{meetingId}/state/publish"),
 
// 5.1.4 获取会议纪要
getMeetingSummary : getMeetingSummaryTypes.get("/api/meeting_summaries/{meetingId}"),
 
// 5.1.2 更新会议纪要
updateMeetingSummary : updateMeetingSummaryTypes.patch("/api/meeting_summaries/{meetingId}"),
 
// 5.1.3 分享会议纪要
shareMeetingSummary : shareMeetingSummaryTypes.post("/api/meeting_summaries/{meetingId}/actions/share"),
 
// 6.1.2 查询联系人列表
getContactList : getContactListTypes.get("/api/personal_contacts/{userId}/persons"),
 
// 6.1.1 添加联系人
addContactPerson : addContactPersonTypes.post("/api/personal_contacts/{userId}/persons"),
 
// 6.2.1 删除联系人
deleteContactPerson : deleteContactPersonTypes.del("/api/personal_contacts/{userId}/persons/{personId}"),
 
// 6.2.2 修改备注
remarkPerson : remarkPersonTypes.patch("/api/personal_contacts/{userId}/persons/{personId}"),
 
// 6.3.1 获取我的团队列表
getTeamList : getTeamListTypes.get("/api/personal_contacts/{userId}/teams?page={page}&row={row}"),
 
// 7.1.1 创建团队
createTeam : createTeamTypes.post("/api/teams"),
 
// 7.2.1 查询团队信息
searchTeam : searchTeamTypes.get("/api/teams/teamId"),
 
// 7.2.2 修改团队信息
patchTeam : patchTeamTypes.patch("/api/teams/teamId"),
 
// 7.3.1 邀请团队成员
inviteTeamMembers : inviteTeamMembersTypes.post("/api/teams/{teamId}/members"),
 
// 7.3.2 加入团队
joinTeam : joinTeamTypes.post("/api/teams/{teamId}/members/actions/join"),
 
// 7.2.3 退出团队
exitTeam : exitTeamTypes.del("/api/teams/{teamId}/members/{userId}"),
 
// 8.1.1 查询发送给自己的消息
getShelfMessage : getShelfMessageTypes.get("/api/notifications?noAck={noAck}&page={page}&row={row}&receiver={userId}"),
 
// 9.1.1 查询操作记录
getOperationLog : getOperationLogTypes.get("/api/operation_records"),
 
// 10.1.1 创建重复会议
创建重复会议 : 创建重复会议Types.post("/api/repeat_meetings"),
 
// 10.2.3 查询重复会议信息
查询重复会议信息 : 查询重复会议信息Types.get("/api/repeat_meetings/:repeat_meeting_id"),
 
// 10.2.1 取消会议
取消会议 : 取消会议Types.del("/api/repeat_meetings/:repeat_meeting_id"),
 
// 10.2.2 修改重复会议信息
修改重复会议信息 : 修改重复会议信息Types.patch("/api/repeat_meetings/:repeat_meeting_id"),
 
// 10.3.1 添加重复会议成员
添加重复会议成员 : 添加重复会议成员Types.post("/api/repeat_meetings/:repeat_meeting_id/repeat_meeting_members"),
 
// 10.4.1 退出重复会议
退出重复会议 : 退出重复会议Types.del("/api/repeat_meetings/:repeat_meetingId/repeat_meeting_members/:repeat_meeting_member_id"),
}

