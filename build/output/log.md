> file-logger, [2018-09-20--09:19:40]

```json
{
  "/api/pauth/authorize?response_type={response_type}&scope={scope}&client_id={client_id}&redirect_uri={redirect_uri}&state={state}&platform={platform}": {
    "get": {
      "parameters": {
        "path": [
          "'response_type' : string; // 固定参数\n",
          "'scope' : string; // 固定参数\n",
          "'client_id' : string; // 客户端 id，向账号系统申请\n",
          "'redirect_uri' : string; // 表示重定向回调地址的uri。uri必须符合创建客户端时的callbackUri设置规则。\n",
          "'state' : string; // 状态，任意值。账号系统会原封不动返回这个值\n",
          "'platform' : string; // 平台，用于给前端进行UI适配。app：移动客户端，pc-app：桌面客户端，maxhub：MAXHUB，web：桌面端浏览器，weixin：移动端微信，mobile：移动端浏览器。默认显示移动端微信版面。\n"
        ]
      },
      "responses": { "200": "" },
      "name": "getToken",
      "summary": "2.1.1 获取授权码"
    }
  },
  "/api/pauth/token?code={code}&grant_type=authorization": {
    "post": {
      "parameters": {
        "path": ["'code' : string; // 账号服务器回调的授权码\n"]
      },
      "responses": {
        "200": "{\n_id : string; // 用户 id\nsystemId : string; // 对应账号系统的 id\naccess_token : string; // 用户访问令牌\nrefresh_token : string; // 刷新令牌，用于刷新访问令牌的有效期\nexpires_in : string; // 令牌有效期，单位秒。一般为1209600，即14天。\ntoken_type : string; // 令牌类型\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "login",
      "summary": "2.2.1 登录"
    }
  },
  "/api/users?mobile={mobile}&email={email}": {
    "get": {
      "parameters": {
        "header": ["// 'Content-Type' : string; \n"],
        "path": [
          "'mobile' : string; // 通过手机号查询，和邮箱互斥\n",
          "'email' : string; // 通过邮箱查询，和手机号互斥\n"
        ]
      },
      "responses": {
        "200": "{\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "searchPerson",
      "summary": "3.1.1 查询用户信息"
    }
  },
  "/api/users/{userId}/actions/config_mail": {
    "patch": {
      "parameters": {
        "path": ["'userId' : string; // 用户 id\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nemail : string; // 邮箱\nusername : string; // 邮箱的用户名base64编码，不填写则默认提取邮箱的名称\npassword : string; // 邮箱的密码\nsmtpServer : string; // 发件服务器\nsmtpPort : number; // 发件服务器端口\n}"
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "setEmail",
      "summary": "3.2.1 配置邮箱"
    }
  },
  "/api/users/{userId}/meeting_records?page={page}&row={row}&state={state}": {
    "get": {
      "parameters": {
        "path": [
          "'userId' : string; \n",
          "'state' : number; \n",
          "'page' : number; \n",
          "'row' : number; \n"
        ],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "200": "{\nuser : string; // 用户 id\nmeeting : {\n_id : string; // 会议 id\nsubject : string; // 会议主题\ncontent : string; // 会议的内容描述\nbeginTime : string; // 会议开始时间\nendTime : string; // 会议结束时间\naddress : string; // 会议地点\nmasterId : string; // 主持人 id\nshareId : string; // 云盘共享空间 id\naccessKey : string; // 共享空间的访问秘钥\nstate : integer; \nmembers : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nmeeting : string; // 会议 id\ncreateTime : string; // 加入会议的时间\nstate : integer; \nfrom : integer; \ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \nrepeatMeeting : string; // 关联的重复会议 id\norder : {\norderNo : string; // 订单 id\nroom : string; // 会议室 id\nstartTime : number; // 开始时间\nendTime : number; // 结束时间\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \ndescription : string; // 订单描述\n}; \n}; \nmember : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nmeeting : string; // 会议 id\ncreateTime : string; // 加入会议的时间\nstate : integer; \nfrom : integer; \ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}; \nnoteContent : string; // 我的会议笔记\nnoteSubject : string; // 我的会议笔记主题\ninviteState : integer; \nsummaryState : integer; \ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "getMeetingList",
      "summary": "3.3.1 查询我的会议列表"
    }
  },
  "/api/users/{userId}/meeting_records/{meetingId}": {
    "delete": {
      "parameters": {
        "path": ["'userId' : string; \n", "'meetingId' : string; \n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "deletMeetingRecord",
      "summary": "3.4.2 删除会议记录"
    },
    "patch": {
      "parameters": {
        "path": ["'userId' : string; \n", "'meetingId' : string; \n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nnoteContent : string; // 更新我的笔记内容\nnoteSubject : string; // 更新我的笔记主题\n}"
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "updateNote",
      "summary": "3.4.1 更新笔记"
    }
  },
  "/api/users/{userId}/meeting_records/{meetingId}/state/read": {
    "patch": {
      "parameters": {
        "path": ["'userId' : string; \n", "'meetingId' : string; \n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "summaryRead",
      "summary": "3.4.3 已读会议纪要"
    }
  },
  "/api/meetings/actions/schedule": {
    "post": {
      "parameters": {
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nsubject : string; // 会议标题\ncontent : string; // 会议内容\nbeginTime : number; // 会议开始时间，unix时间戳，单位毫秒\nendTime : number; // 会议结束时间，unix时间戳，单位毫秒\naddress : string; // 会议地点\nmembers : {\nmobiles : string[]\n; // 通过手机添加\nemails : string[]\n; // 通过邮箱添加\nids : string[]\n; // 通过 id 添加，未注册的 id 将被忽略\n}; \nattachments : string[]\n; \n}"
      },
      "responses": {
        "201": "{\n_id : string; // 会议 id\nsubject : string; // 会议主题\ncontent : string; // 会议的内容描述\nbeginTime : string; // 会议开始时间\nendTime : string; // 会议结束时间\naddress : string; // 会议地点\nmasterId : string; // 主持人 id\nshareId : string; // 云盘共享空间 id\naccessKey : string; // 共享空间的访问秘钥\nstate : integer; \nmembers : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nmeeting : string; // 会议 id\ncreateTime : string; // 加入会议的时间\nstate : integer; \nfrom : integer; \ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \nrepeatMeeting : string; // 关联的重复会议 id\norder : {\norderNo : string; // 订单 id\nroom : string; // 会议室 id\nstartTime : number; // 开始时间\nendTime : number; // 结束时间\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \ndescription : string; // 订单描述\n}; \n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "scheduleMeeting",
      "summary": "4.1.1 预约会议"
    }
  },
  "/api/meetings/actions/immediate": {
    "post": {
      "parameters": { "header": ["// 'Content-Type' : string; \n"] },
      "responses": {
        "201": "{\n_id : string; // 会议 id\nsubject : string; // 会议主题\ncontent : string; // 会议的内容描述\nbeginTime : string; // 会议开始时间\nendTime : string; // 会议结束时间\naddress : string; // 会议地点\nmasterId : string; // 主持人 id\nshareId : string; // 云盘共享空间 id\naccessKey : string; // 共享空间的访问秘钥\nstate : integer; \nmembers : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nmeeting : string; // 会议 id\ncreateTime : string; // 加入会议的时间\nstate : integer; \nfrom : integer; \ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \nrepeatMeeting : string; // 关联的重复会议 id\norder : {\norderNo : string; // 订单 id\nroom : string; // 会议室 id\nstartTime : number; // 开始时间\nendTime : number; // 结束时间\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \ndescription : string; // 订单描述\n}; \n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "imediateMeeting",
      "summary": "4.1.2 即时会议"
    }
  },
  "/api/meetings/{meetingId}": {
    "get": {
      "parameters": { "path": ["'meetingId' : string; // 会议ID\n"] },
      "responses": {
        "200": "{\n_id : string; // 会议 id\nsubject : string; // 会议主题\ncontent : string; // 会议的内容描述\nbeginTime : string; // 会议开始时间\nendTime : string; // 会议结束时间\naddress : string; // 会议地点\nmasterId : string; // 主持人 id\nshareId : string; // 云盘共享空间 id\naccessKey : string; // 共享空间的访问秘钥\nstate : integer; \nmembers : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nmeeting : string; // 会议 id\ncreateTime : string; // 加入会议的时间\nstate : integer; \nfrom : integer; \ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \nrepeatMeeting : string; // 关联的重复会议 id\norder : {\norderNo : string; // 订单 id\nroom : string; // 会议室 id\nstartTime : number; // 开始时间\nendTime : number; // 结束时间\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \ndescription : string; // 订单描述\n}; \n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "searchMeetingMessage",
      "summary": "4.2.1 查询会议信息"
    },
    "patch": {
      "parameters": {
        "path": ["'meetingId' : string; // 会议ID\n"],
        "body": "{\nsubject : string; // 会议主题\ncontent : string; // 会议的内容描述\nbeginTime : number; // 会议开始时间\nendTime : number; // 会议结束时间\naddress : string; // 会议地点\n}"
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "modifyMeetingMeesage",
      "summary": "4.2.2 修改会议信息"
    }
  },
  "/api/meetings/{meetingId}/state/cancel": {
    "patch": {
      "parameters": {
        "path": ["'meetingId' : string; // 会议ID\n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "cancelSchedule",
      "summary": "4.2.3 取消会议/取消预约"
    }
  },
  "/api/meetings/{meetingId}/state/finish": {
    "patch": {
      "parameters": {
        "path": ["'meetingId' : string; // 会议ID\n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "endTheMeeting",
      "summary": "4.2.4 结束会议"
    }
  },
  "/api/meetings/{meetingId}/members": {
    "post": {
      "parameters": {
        "path": ["'meetingId' : string; // 会议ID\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nmobiles : string[]\n; // 通过手机添加\nemails : string[]\n; // 通过邮箱添加\nids : string[]\n; // 通过 id 添加，未注册的 id 将被忽略\n}"
      },
      "responses": {
        "200": "{\n_id : string; // 会议 id\nsubject : string; // 会议主题\ncontent : string; // 会议的内容描述\nbeginTime : string; // 会议开始时间\nendTime : string; // 会议结束时间\naddress : string; // 会议地点\nmasterId : string; // 主持人 id\nshareId : string; // 云盘共享空间 id\naccessKey : string; // 共享空间的访问秘钥\nstate : integer; \nmembers : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nmeeting : string; // 会议 id\ncreateTime : string; // 加入会议的时间\nstate : integer; \nfrom : integer; \ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \nrepeatMeeting : string; // 关联的重复会议 id\norder : {\norderNo : string; // 订单 id\nroom : string; // 会议室 id\nstartTime : number; // 开始时间\nendTime : number; // 结束时间\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \ndescription : string; // 订单描述\n}; \n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "inviteMeetingMembers",
      "summary": "4.3.1 邀请与会人员"
    }
  },
  "/api/meetings/{meetingId}/members/{memberId}": {
    "delete": {
      "parameters": {
        "path": [
          "'meetingId' : string; // 会议ID\n",
          "'memberId' : string; // 用户ID\n"
        ],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "exitMeeting",
      "summary": "4.4.1 退出会议"
    },
    "patch": {
      "parameters": {
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nstate : number; // 邀请状态，1为拒绝，2为确认\n}",
        "path": ["'meetingId' : string; \n", "'memberId' : string; \n"]
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "confirmIniviting",
      "summary": "4.4.2 确认/拒绝邀请"
    }
  },
  "/api/meetings/{meetingid}/attachments": {
    "get": {
      "parameters": {
        "path": ["'meetingid' : string; // 会议ID\n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "200": "{\ndownloadUrl : string; // 附件地址\n_id : string; // 附件存储在云盘的 id\nmeeting : string; \nname : string; \ncreateTime : string; // 文件上传时间\ncontentType : string; // 文件类型\nsize : string; // 文件大小（字节）\n}[]\n",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "searchAdjunct",
      "summary": "4.4.1 查询附件信息"
    },
    "post": {
      "parameters": {
        "path": ["'meetingid' : string; // 会议ID\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\ndownloadUrl : string; // 附件地址\n_id : string; // 附件存储在云盘的 id\nmeeting : string; \nname : string; \ncreateTime : string; // 文件上传时间\ncontentType : string; // 文件类型\nsize : string; // 文件大小（字节）\n}[]\n"
      },
      "responses": {
        "201": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "uploadAdjunct",
      "summary": "4.4.2 上传附件"
    }
  },
  "/api/meetings/{id}/attachments/{shareId}": {
    "delete": {
      "parameters": {
        "query": ["'meetingid' : string; // 会议ID\n"],
        "path": [
          "'id' : string; // 会议ID\n",
          "'shareId' : string; // 在云盘的 id\n"
        ],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "deleteAdjunct",
      "summary": "4.4.3 删除附件"
    }
  },
  "/api/meeting_summaries/{meetingId}/state/publish": {
    "patch": {
      "parameters": {
        "path": ["'meetingId' : string; // 会议ID\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nsubject : string; // 会议纪要标题\ncontent : string; // 会议纪要内容\n}"
      },
      "responses": {
        "201": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "publishSummary",
      "summary": "5.1.1 发布会议纪要"
    }
  },
  "/api/meeting_summaries/{meetingId}": {
    "get": {
      "parameters": {
        "path": ["'meetingId' : string; // 会议ID\n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "200": "{\n_id : string; // 会议 id\nsubject : string; // 会议纪要主题\ncontent : string; // 会议纪要内容\nstate : integer; \n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "getMeetingSummary",
      "summary": "5.1.4 获取会议纪要"
    },
    "patch": {
      "parameters": {
        "path": ["'meetingId' : string; // 会议ID\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nsubject : string; // 会议纪要标题\ncontent : string; // 会议纪要内容\n}"
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "updateMeetingSummary",
      "summary": "5.1.2 更新会议纪要"
    }
  },
  "/api/meeting_summaries/{meetingId}/actions/share": {
    "post": {
      "parameters": {
        "path": ["'meetingId' : string; // 会议ID\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "string"
      },
      "responses": {
        "201": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "shareMeetingSummary",
      "summary": "5.1.3 分享会议纪要"
    }
  },
  "/api/personal_contacts/{userId}/persons": {
    "get": {
      "parameters": {
        "path": ["'userId' : string; // 用户 id\n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "200": "{\nperson : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nfrom : integer; \nremark : string; // 备注\ncreateTime : number; // 创建时间\nuserId : string; // 所属用户 id\n}[]\n",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "getContactList",
      "summary": "6.1.2 查询联系人列表"
    },
    "post": {
      "parameters": {
        "path": ["'userId' : string; // 用户 id\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nmobile : string; // 通过手机添加\nemail : string; // 通过邮箱添加\n}"
      },
      "responses": {
        "201": "{\nperson : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nfrom : integer; \nremark : string; // 备注\ncreateTime : number; // 创建时间\nuserId : string; // 所属用户 id\n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "addContactPerson",
      "summary": "6.1.1 添加联系人"
    }
  },
  "/api/personal_contacts/{userId}/persons/{personId}": {
    "delete": {
      "parameters": {
        "path": [
          "'userId' : string; // 用户 id\n",
          "'personId' : string; // 联系人 id\n"
        ],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "deleteContactPerson",
      "summary": "6.2.1 删除联系人"
    },
    "patch": {
      "parameters": {
        "path": [
          "'userId' : string; // 用户 id\n",
          "'personId' : string; // 联系人 id\n"
        ],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "remarkPerson",
      "summary": "6.2.2 修改备注"
    }
  },
  "/api/personal_contacts/{userId}/teams?page={page}&row={row}": {
    "get": {
      "parameters": {
        "path": [
          "'userId' : string; // 用户 id\n",
          "'page' : number; // 数据分页（本期暂不实现）\n",
          "'row' : number; // 每页数据数量（本期暂不实现）\n"
        ],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "200": "{\n_id : string; // 团队 id\nname : string; // 团队名称\ncreateTime : number; // 创建时间\nmasterId : string; // 创建者 id\nmembers : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nfrom : integer; \ncreateTime : string; // 成员加入时间\ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \n}[]\n",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "getTeamList",
      "summary": "6.3.1 获取我的团队列表"
    }
  },
  "/api/teams": {
    "post": {
      "parameters": {
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nname : string; // 团队名称\n}"
      },
      "responses": {
        "200": "{\n_id : string; // 团队 id\nname : string; // 团队名称\ncreateTime : number; // 创建时间\nmasterId : string; // 创建者 id\nmembers : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nfrom : integer; \ncreateTime : string; // 成员加入时间\ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "createTeam",
      "summary": "7.1.1 创建团队"
    }
  },
  "/api/teams/teamId": {
    "get": {
      "parameters": {
        "query": ["'teamId' : string; // 团队 id\n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "200": "{\n_id : string; // 团队 id\nname : string; // 团队名称\ncreateTime : number; // 创建时间\nmasterId : string; // 创建者 id\nmembers : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nfrom : integer; \ncreateTime : string; // 成员加入时间\ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "searchTeam",
      "summary": "7.2.1 查询团队信息"
    },
    "patch": {
      "parameters": {
        "query": ["'teamId' : string; // 团队 id\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\n}"
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "patchTeam",
      "summary": "7.2.2 修改团队信息"
    }
  },
  "/api/teams/{teamId}/members": {
    "post": {
      "parameters": {
        "path": ["'teamId' : string; // 团队 ID\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nmobiles : string[]\n; // 通过手机添加\nemails : string[]\n; // 通过邮箱添加\nids : string[]\n; // 通过 id 添加，未注册的 id 将被忽略\n}"
      },
      "responses": {
        "200": "{\n_id : string; // 团队 id\nname : string; // 团队名称\ncreateTime : number; // 创建时间\nmasterId : string; // 创建者 id\nmembers : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nfrom : integer; \ncreateTime : string; // 成员加入时间\ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\nfailUsers : {\nemail : string; // 邮箱\n}[]\n; \n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "inviteTeamMembers",
      "summary": "7.3.1 邀请团队成员"
    }
  },
  "/api/teams/{teamId}/members/actions/join": {
    "post": {
      "parameters": {
        "path": ["'teamId' : string; // 团队 ID\n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "200": "{\n_id : string; // 团队 id\nname : string; // 团队名称\ncreateTime : number; // 创建时间\nmasterId : string; // 创建者 id\nmembers : {\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nfrom : integer; \ncreateTime : string; // 成员加入时间\ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "joinTeam",
      "summary": "7.3.2 加入团队"
    }
  },
  "/api/teams/{teamId}/members/{userId}": {
    "delete": {
      "parameters": {
        "path": [
          "'teamId' : string; // 团队 ID\n",
          "'userId' : string; // 当前用户 id\n"
        ],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "204": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "exitTeam",
      "summary": "7.2.3 退出团队"
    }
  },
  "/api/notifications?noAck={noAck}&page={page}&row={row}&receiver={userId}": {
    "get": {
      "parameters": {
        "path": [
          "'userId' : string; \n",
          "'noAck' : boolean; // true 则只查询未读的消息\n",
          "'page' : number; // \b消息的页数，page 和 row 必须同时设置（当前版本暂不实现）\n",
          "'row' : number; // 每页消息的个数，page 和 row 必须同时设置（当前版本暂不实现）\n"
        ],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "200": "{\n_id : string; // 通知 id\ncontent : string; // 消息内容\ntype : integer; \nack : string; // 是否接收到消息\n}[]\n",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "getShelfMessage",
      "summary": "8.1.1 查询发送给自己的消息"
    }
  },
  "/api/operation_records": {
    "get": {
      "parameters": { "header": ["// 'Content-Type' : string; \n"] },
      "responses": {
        "200": "{\nattribute : string; // 修改的属性/对象\npreValue : string; // 修改前的值\ncurValue : string; // 修改后的值\nmeetingId : string; // 会议 id\nmodifyUserId : string; // 修改人 id\n}[]\n",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "getOperationLog",
      "summary": "9.1.1 查询操作记录"
    }
  },
  "/api/repeat_meetings": {
    "post": {
      "parameters": {
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nsubject : string; // 会议标题\ncontent : string; // 会议内容\nbeginTime : number; // 首次会议开始时间，unix时间戳，单位毫秒\nendTime : number; // 首次会议结束时间，unix时间戳，单位毫秒\naddress : string; // 会议地点\nroomId : string; // 会议室 id\nmembers : {\nmobiles : string[]\n; // 通过手机添加\nemails : string[]\n; // 通过邮箱添加\nids : string[]\n; // 通过 id 添加，未注册的 id 将被忽略\n}; \nrepeatEndTime : number; // 重复会议结束时时间，unix时间戳，单位毫秒\nrepeatType : number; // 重复类型，0为日，1为周\nrepeatValue : number; // 如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7\n}"
      },
      "responses": {
        "201": "{\nsubject : string; // 会议标题\ncontent : string; // 会议内容\nbeginTime : number; // 首次会议开始时间，unix时间戳，单位毫秒\nendTime : number; // 首次会议结束时间，unix时间戳，单位毫秒\naddress : string; // 会议地点\nroom : {\nid : string; // 会议室 id\nname : string; // 会议室名称\narea : string; // 会议室所在区域\ndescription : string; // 会议室描述\n}; \nmembers : {\n_id : string; // 重复会议与会人员 id\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nrepeatMeeting : string; // 关联的重复会议\nfrom : integer; \ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \nrepeatEndTime : number; // 重复会议结束时时间，unix时间戳，单位毫秒\nrepeatType : number; // 重复类型，0为日，1为周\nrepeatValue : number; // 如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7\nmaster : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \ncreator : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nstate : number; // 重复会议状态，0为使用中，1为取消\n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "创建重复会议",
      "summary": "10.1.1 创建重复会议"
    }
  },
  "/api/repeat_meetings/:repeat_meeting_id": {
    "get": {
      "parameters": {
        "query": ["'repeat_meeting_id' : string; // 重复会议 id\n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "200": "{\nsubject : string; // 会议标题\ncontent : string; // 会议内容\nbeginTime : number; // 首次会议开始时间，unix时间戳，单位毫秒\nendTime : number; // 首次会议结束时间，unix时间戳，单位毫秒\naddress : string; // 会议地点\nroom : {\nid : string; // 会议室 id\nname : string; // 会议室名称\narea : string; // 会议室所在区域\ndescription : string; // 会议室描述\n}; \nmembers : {\n_id : string; // 重复会议与会人员 id\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nrepeatMeeting : string; // 关联的重复会议\nfrom : integer; \ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \nrepeatEndTime : number; // 重复会议结束时时间，unix时间戳，单位毫秒\nrepeatType : number; // 重复类型，0为日，1为周\nrepeatValue : number; // 如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7\nmaster : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \ncreator : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nstate : number; // 重复会议状态，0为使用中，1为取消\n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "查询重复会议信息",
      "summary": "10.2.3 查询重复会议信息"
    },
    "delete": {
      "parameters": {
        "query": ["'repeat_meeting_id' : string; // 重复会议 id\n"],
        "header": ["// 'Content-Type' : string; \n"]
      },
      "responses": {
        "200": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "取消会议",
      "summary": "10.2.1 取消会议"
    },
    "patch": {
      "parameters": {
        "query": ["'repeat_meeting_id' : string; // 重复会议 id\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nsubject : string; // 会议标题\ncontent : string; // 会议内容\nbeginTime : number; // 首次会议开始时间，unix时间戳，单位毫秒\nendTime : number; // 首次会议结束时间，unix时间戳，单位毫秒\naddress : string; // 会议地点\nroomId : string; // 会议室 id\nrepeatEndTime : number; // 重复会议结束时时间，unix时间戳，单位毫秒\nrepeatType : number; // 重复类型，0为日，1为周\nrepeatValue : number; // 如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7\n}"
      },
      "responses": {
        "200": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "修改重复会议信息",
      "summary": "10.2.2 修改重复会议信息"
    }
  },
  "/api/repeat_meetings/:repeat_meeting_id/repeat_meeting_members": {
    "post": {
      "parameters": {
        "query": ["'repeat_meeting_id' : string; // 重复会议 id\n"],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nmobiles : string[]\n; // 通过手机添加\nemails : string[]\n; // 通过邮箱添加\nids : string[]\n; // 通过 id 添加，未注册的 id 将被忽略\n}"
      },
      "responses": {
        "201": "{\nsubject : string; // 会议标题\ncontent : string; // 会议内容\nbeginTime : number; // 首次会议开始时间，unix时间戳，单位毫秒\nendTime : number; // 首次会议结束时间，unix时间戳，单位毫秒\naddress : string; // 会议地点\nroom : {\nid : string; // 会议室 id\nname : string; // 会议室名称\narea : string; // 会议室所在区域\ndescription : string; // 会议室描述\n}; \nmembers : {\n_id : string; // 重复会议与会人员 id\nuser : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nrepeatMeeting : string; // 关联的重复会议\nfrom : integer; \ninvitor : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \n}[]\n; \nrepeatEndTime : number; // 重复会议结束时时间，unix时间戳，单位毫秒\nrepeatType : number; // 重复类型，0为日，1为周\nrepeatValue : number; // 如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7\nmaster : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \ncreator : {\n_id : string; // 用户 id\nemail : string; // 邮箱\nmobile : string; // 手机号\ncreateTime : string; // 用户创建时间\nisMailConfig : string; // 邮箱是否配置\navatar : string; // 头像地址\ndisplayName : string; // 用户昵称\nsystemId : string; // 对应账号系统的 id\n}; \nstate : number; // 重复会议状态，0为使用中，1为取消\n}",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "添加重复会议成员",
      "summary": "10.3.1 添加重复会议成员"
    }
  },
  "/api/repeat_meetings/:repeat_meetingId/repeat_meeting_members/:repeat_meeting_member_id": {
    "delete": {
      "parameters": {
        "query": [
          "'repeat_meeting_id' : string; // 重复会议 id\n",
          "'repeat_meeting_member_id' : string; // 重复会议成员 userId\n"
        ],
        "header": ["// 'Content-Type' : string; \n"],
        "body": "{\nmobiles : string[]\n; // 通过手机添加\nemails : string[]\n; // 通过邮箱添加\nids : string[]\n; // 通过 id 添加，未注册的 id 将被忽略\n}"
      },
      "responses": {
        "200": "",
        "400": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}",
        "default": "{\ncode : number; // 错误码\nmessage : string; // 错误内容\n}"
      },
      "name": "退出重复会议",
      "summary": "10.4.1 退出重复会议"
    }
  }
}
```

---

> file-logger, [2018-09-20--09:19:40]

```json
export const nameConfig = {"获取授权码":"getToken",
"登录":"login",
"查询用户信息":"searchPerson",
"配置邮箱":"setEmail",
"查询我的会议列表":"getMeetingList",
"删除会议记录":"deletMeetingRecord",
"更新笔记":"updateNote",
"已读会议纪要":"summaryRead",
"预约会议":"scheduleMeeting",
"即时会议":"imediateMeeting",
"查询会议信息":"searchMeetingMessage",
"修改会议信息":"modifyMeetingMeesage",
"取消会议/取消预约":"cancelSchedule",
"结束会议":"endTheMeeting",
"邀请与会人员":"inviteMeetingMembers",
"退出会议":"exitMeeting",
"确认/拒绝邀请":"confirmIniviting",
"查询附件信息":"searchAdjunct",
"上传附件":"uploadAdjunct",
"删除附件":"deleteAdjunct",
"发布会议纪要":"publishSummary",
"获取会议纪要":"getMeetingSummary",
"更新会议纪要":"updateMeetingSummary",
"分享会议纪要":"shareMeetingSummary",
"查询联系人列表":"getContactList",
"添加联系人":"addContactPerson",
"删除联系人":"deleteContactPerson",
"修改备注":"remarkPerson",
"获取我的团队列表":"getTeamList",
"创建团队":"createTeam",
"查询团队信息":"searchTeam",
"修改团队信息":"patchTeam",
"邀请团队成员":"inviteTeamMembers",
"加入团队":"joinTeam",
"退出团队":"exitTeam",
"查询发送给自己的消息":"getShelfMessage",
"查询操作记录":"getOperationLog",
"创建重复会议":"createRepeatMeeting",
"查询重复会议信息":"getRepeatMeetingMessage",
"取消会议":"cancelRepeatMeeting",
"修改重复会议信息":"patchRepeatMeeting",
"添加重复会议成员":"addRepeatMeetingMembers",
"退出重复会议":"exitRepeatMeeting",
}
```

---
