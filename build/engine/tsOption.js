"use strict";
const tsOption = {
    "/api/pauth/authorize?response_type={response_type}&scope={scope}&client_id={client_id}&redirect_uri={redirect_uri}&state={state}&platform={platform}": {
        get: {
            path: [
                "response_type : string; //固定参数\n",
                "scope : string; //固定参数\n",
                "client_id : string; //客户端 id，向账号系统申请\n",
                "redirect_uri : string; //表示重定向回调地址的uri。uri必须符合创建客户端时的callbackUri设置规则。\n",
                "state : string; //状态，任意值。账号系统会原封不动返回这个值\n",
                "platform : string; //平台，用于给前端进行UI适配。app：移动客户端，pc-app：桌面客户端，maxhub：MAXHUB，web：桌面端浏览器，weixin：移动端微信，mobile：移动端浏览器。默认显示移动端微信版面。\n"
            ]
        }
    },
    "/api/pauth/token?code={code}&grant_type=authorization": {
        post: { path: ["code : string; //账号服务器回调的授权码\n"] }
    },
    "/api/users?mobile={mobile}&email={email}": {
        get: {
            header: ["Content-Type : string; \n"],
            path: [
                "mobile : string; //通过手机号查询，和邮箱互斥\n",
                "email : string; //通过邮箱查询，和手机号互斥\n"
            ]
        }
    },
    "/api/users/{userId}/actions/config_mail": {
        patch: {
            path: ["userId : string; //用户 id\n"],
            header: ["Content-Type : string; \n"],
            body: "{email : string; //邮箱\npassword : string; //邮箱的密码\nusername : string; //邮箱的用户名base64编码，不填写则默认提取邮箱的名称\nsmtpServer : string; //发件服务器\nsmtpPort : number; //发件服务器端口\n}\n"
        }
    },
    "/api/users/{userId}/meeting_records?page={page}&row={row}&state={state}": {
        get: {
            path: [
                "userId : string; \n",
                "state : number; \n",
                "page : number; \n",
                "row : number; \n"
            ],
            header: ["Content-Type : string; \n"]
        }
    },
    "/api/users/{userId}/meeting_records/{meetingId}": {
        delete: {
            path: ["userId : string; \n", "meetingId : string; \n"],
            header: ["Content-Type : string; \n"]
        },
        patch: {
            path: ["userId : string; \n", "meetingId : string; \n"],
            header: ["Content-Type : string; \n"],
            body: "{noteContent : string; //更新我的笔记内容\nnoteSubject : string; //更新我的笔记主题\ntop : boolean; //置顶/取消置顶\n}\n"
        }
    },
    "/api/meetings/actions/schedule": {
        post: {
            header: ["Content-Type : string; \n"],
            body: "{subject : string; //会议标题\ncontent : string; //会议内容\nbeginTime : number; //会议开始时间，unix时间戳，单位毫秒\nendTime : number; //会议结束时间，unix时间戳，单位毫秒\naddress : string; //会议地点\nmembers : {mobile : string; //与会者手机号\nuserId : string; //与会者用户 id\nmeetingId : string; //会议 id\ncreateTime : string; //加入会议的时间\nstate : number; //+0 \n+1\n+2\n}\n[]\n; \n}\n"
        }
    },
    "/api/meetings/actions/imediate": {
        post: { header: ["Content-Type : string; \n"] }
    },
    "/api/meetings/{meetingId}": {
        get: { path: ["meetingId : string; //会议ID\n"] },
        patch: {
            path: ["meetingId : string; //会议ID\n"],
            header: ["Content-Type : string; \n"],
            body: "{state : number; //取消会议状态，不支持其他值\n}\n"
        }
    },
    "/api/meetings/{meetingId}/members": {
        post: {
            path: ["meetingId : string; //会议ID\n"],
            header: ["Content-Type : string; \n"],
            body: "{mobile : string; //通过手机邀请未注册的用户\nuserId : string; //邀请已注册的用户\nemail : string; //通过邮箱邀请未注册的用户\n}\n[]\n"
        }
    },
    "/api/meetings/{meetingId}/members/{memberId}": {
        delete: {
            path: ["meetingId : string; //会议ID\n", "memberId : string; //用户ID\n"],
            header: ["Content-Type : string; \n"]
        },
        patch: {
            query: ["id : string; //会议ID\n"],
            header: ["Content-Type : string; \n"],
            body: "{state : number; //取消会议状态，不支持其他值\n}\n",
            path: ["meetingId : string; \n", "memberId : string; \n"]
        }
    },
    "/api/meetings/{meetingid}/attachments": {
        get: {
            path: ["meetingid : string; //会议ID\n"],
            header: ["Content-Type : string; \n"]
        },
        post: {
            path: ["meetingid : string; //会议ID\n"],
            header: ["Content-Type : string; \n"],
            body: "string"
        }
    },
    "/api/meetings/{id}/attachments/{shareId}": {
        delete: {
            query: ["meetingid : string; //会议ID\n"],
            path: ["id : string; //会议ID\n", "shareId : string; //在云盘的 id\n"],
            header: ["Content-Type : string; \n"]
        }
    },
    "/api/meeting_summaries/{meetingId}/state/publish": {
        post: {
            path: ["meetingId : string; //会议ID\n"],
            header: ["Content-Type : string; \n"],
            body: "string"
        }
    },
    "/api/meeting_summaries/{meetingId}": {
        put: {
            path: ["meetingId : string; //会议ID\n"],
            header: ["Content-Type : string; \n"],
            body: "string"
        }
    },
    "/api/meeting_summaries/{meetingId}/actions/share": {
        post: {
            path: ["meetingId : string; //会议ID\n"],
            header: ["Content-Type : string; \n"],
            body: "string"
        }
    },
    "/api/personal_contacts/{userId}/persons": {
        get: {
            path: ["userId : string; //用户 id\n"],
            header: ["Content-Type : string; \n"]
        },
        post: {
            path: ["userId : string; //用户 id\n"],
            header: ["Content-Type : string; \n"],
            body: "{userId : string; //联系人的 userId\nfrom : number; //添加方式，0为手机号，1为邮箱\n}\n"
        }
    },
    "/api/personal_contacts/{userId}/persons/{personId}": {
        delete: {
            path: [
                "userId : string; //用户 id\n",
                "personId : string; //联系人 id\n"
            ],
            header: ["Content-Type : string; \n"]
        }
    },
    "/api/personal_contacts/{userId}/teams?page={page}&row={row}": {
        get: {
            path: [
                "userId : string; //用户 id\n",
                "page : number; //数据分页（本期暂不实现）\n",
                "row : number; //每页数据数量（本期暂不实现）\n"
            ],
            header: ["Content-Type : string; \n"]
        }
    },
    "/api/teams": {
        post: {
            header: ["Content-Type : string; \n"],
            body: "{name : string; //团队名称\n}\n"
        }
    },
    "/api/teams/teamId": {
        get: {
            query: ["teamId : string; //团队 id\n"],
            header: ["Content-Type : string; \n"]
        },
        patch: {
            query: ["teamId : string; //团队 id\n"],
            header: ["Content-Type : string; \n"],
            body: "{}\n"
        }
    },
    "/api/teams/{teamId}/members": {
        post: {
            path: ["teamId : string; //团队 ID\n"],
            header: ["Content-Type : string; \n"],
            body: "{mobile : string; //通过手机邀请未注册的用户\nuserId : string; //邀请已注册的用户\nemail : string; //通过邮箱邀请未注册的用户\n}\n[]\n"
        }
    },
    "/api/teams/{teamId}/members/actions/join": {
        post: {
            path: ["teamId : string; //团队 ID\n"],
            header: ["Content-Type : string; \n"]
        }
    },
    "/api/teams/{teamId}/members/{userId}": {
        delete: {
            path: [
                "teamId : string; //团队 ID\n",
                "userId : string; //当前用户 id\n"
            ],
            header: ["Content-Type : string; \n"]
        }
    },
    "/api/notifications?noAck={noAck}&page={page}&row={row}&receiver={userId}": {
        get: {
            path: [
                "userId : string; \n",
                "noAck : boolean; //true 则只查询未读的消息\n",
                "page : number; //\b消息的页数，page 和 row 必须同时设置（当前版本暂不实现）\n",
                "row : number; //每页消息的个数，page 和 row 必须同时设置（当前版本暂不实现）\n"
            ],
            header: ["Content-Type : string; \n"]
        }
    },
    "/api/operation_records": { get: { header: ["Content-Type : string; \n"] } }
};
