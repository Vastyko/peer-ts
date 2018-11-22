"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = {
    swagger: "2.0",
    info: {
        version: "1.0",
        title: "1. Teams 会议协作平台API接口协议",
        description: "TODO: Add a description"
    },
    host: "apis.maxhub.vip",
    basePath: "/teams",
    securityDefinitions: {
        auth: {
            type: "oauth2",
            flow: "implicit",
            authorizationUrl: "https://apis.maxhub.vip/teams",
            scopes: {}
        }
    },
    schemes: ["https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
        "/api/pauth/authorize?response_type={response_type}&scope={scope}&client_id={client_id}&redirect_uri={redirect_uri}&state={state}&platform={platform}": {
            get: {
                description: "该请求会重定向至对应的账号系统，显示账号系统的登录页。网页登录成功后，会返回重定向信息，重定向的地址为接口参数，redirect_uri。\n比如 https://example.com?code=12345\n客户端应该拦截此重定向，截取接口中的code，调用2.2.1的登录接口进行登录操作。",
                summary: "2.1.1 获取授权码",
                tags: ["2. 账号接口"],
                operationId: "ApiPauthAuthorizeClientIdClientIdRedirectUriRedirectUriStateStatePlatformPlatformByScopeGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "response_type",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "固定参数"
                    },
                    {
                        name: "scope",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "固定参数"
                    },
                    {
                        name: "client_id",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "客户端 id，向账号系统申请"
                    },
                    {
                        name: "redirect_uri",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "表示重定向回调地址的uri。uri必须符合创建客户端时的callbackUri设置规则。"
                    },
                    {
                        name: "state",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "状态，任意值。账号系统会原封不动返回这个值"
                    },
                    {
                        name: "platform",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "平台，用于给前端进行UI适配。app：移动客户端，pc-app：桌面客户端，maxhub：MAXHUB，web：桌面端浏览器，weixin：移动端微信，mobile：移动端浏览器。默认显示移动端微信版面。"
                    }
                ],
                responses: {
                    "200": {
                        description: ""
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/pauth/token?code={code}&grant_type=authorization": {
            post: {
                description: "客户端在前端获取到 code 后，通过此接口进行登录，返回 token 信息以及用户信息",
                summary: "2.2.1 登录",
                tags: ["2. 账号接口"],
                operationId: "ApiPauthTokenGrantTypeAuthorizationByCodePost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "code",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "账号服务器回调的授权码"
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/Account"
                        },
                        examples: {
                            "application/json": {
                                _id: "cb5222accd2acec",
                                systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a",
                                access_token: "f14454c5-83b5-4611-bf47-a9a486824983",
                                refresh_token: "f14454c5-83b5-4611-bf47-a9a486824983",
                                expires_in: "1209600",
                                token_type: "Bearer",
                                email: "luhui@cvte.com",
                                mobile: "13929561881",
                                createTime: "1532920897000",
                                isMailConfig: "true",
                                avatar: "https://res.maxhub.vip/img/123",
                                displayName: "账号系统的昵称"
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/users?mobile={mobile}&email={email}": {
            get: {
                description: "1. 手机号和邮箱，只会返回一个，根据查询的条件决定。用手机号查询，则返回手机号信息，用邮箱查询，则返回邮箱信息\n2. 返回的信息里，手机号和邮箱只显示部分信息\n3. 对于未注册用户，如果该手机号或邮箱从未被其他人邀请加入会议或者团队，则返回404，否则返回相应的 userId，此时 systemId 为空。客户端应通过 systemId 是否为空来判断该用户是否已注册",
                summary: "3.1.1 查询用户信息",
                tags: ["3. 用户接口协议"],
                operationId: "ApiUsersByMobileAndEmailGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "mobile",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "通过手机号查询，和邮箱互斥"
                    },
                    {
                        name: "email",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "通过邮箱查询，和手机号互斥"
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/User"
                        },
                        examples: {
                            "application/json": {
                                _id: "cb5222accd2acec",
                                email: "luhui@cvte.com",
                                mobile: "13929561881",
                                createTime: "1532920897000",
                                isMailConfig: "true",
                                avatar: "https://res.maxhub.vip/img/123",
                                displayName: "账号系统的昵称",
                                systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/users/{userId}/actions/config_mail": {
            patch: {
                description: "配置邮箱，同时在推送系统里注册邮箱信息",
                summary: "3.2.1 配置邮箱",
                tags: ["3. 用户接口协议"],
                operationId: "ApiUsersActionsConfigMailByUserIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "用户 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/3.2.1配置邮箱Request"
                        }
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/users/{userId}/meeting_records?page={page}&row={row}&state={state}": {
            get: {
                description: "",
                summary: "3.3.1 查询我的会议列表",
                tags: ["3. 用户接口协议"],
                operationId: "ApiUsersMeetingRecordsRowRowStateStateByUserIdAndPageGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "state",
                        in: "path",
                        required: true,
                        type: "number",
                        format: "double",
                        exclusiveMaximum: false,
                        exclusiveMinimum: false,
                        description: ""
                    },
                    {
                        name: "page",
                        in: "path",
                        required: true,
                        type: "number",
                        format: "double",
                        exclusiveMaximum: false,
                        exclusiveMinimum: false,
                        description: ""
                    },
                    {
                        name: "row",
                        in: "path",
                        required: true,
                        type: "number",
                        format: "double",
                        exclusiveMaximum: false,
                        exclusiveMinimum: false,
                        description: ""
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/MeetingRecord"
                            }
                        },
                        examples: {
                            "application/json": [
                                {
                                    user: "cb5222accd2acec",
                                    meeting: {
                                        _id: "cb5222accd2acec",
                                        subject: "交互评审会议",
                                        content: "teams 的交互评审",
                                        beginTime: "1532920897000",
                                        endTime: "1532930897000",
                                        address: "科珠425",
                                        master: "cb5222accd2acec",
                                        creator: "cb5222accd2acec",
                                        shareId: "cb5222accd2acec",
                                        accessKey: "1234",
                                        state: 0,
                                        members: [
                                            {
                                                user: {
                                                    _id: "cb5222accd2acec",
                                                    email: "luhui@cvte.com",
                                                    mobile: "13929561881",
                                                    createTime: "1532920897000",
                                                    isMailConfig: "true",
                                                    avatar: "https://res.maxhub.vip/img/123",
                                                    displayName: "账号系统的昵称",
                                                    systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                                },
                                                meeting: "cb5222accd2acec",
                                                createTime: "1532930897000",
                                                state: 0,
                                                from: 0,
                                                invitor: {
                                                    _id: "cb5222accd2acec",
                                                    email: "luhui@cvte.com",
                                                    mobile: "13929561881",
                                                    createTime: "1532920897000",
                                                    isMailConfig: "true",
                                                    avatar: "https://res.maxhub.vip/img/123",
                                                    displayName: "账号系统的昵称",
                                                    systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                                }
                                            }
                                        ],
                                        repeatMeeting: "cb5222accd2acec",
                                        order: {
                                            orderNo: "1caf9ed93ab36c9ae28",
                                            room: "1caf9ed93ab36c9ae28",
                                            startTime: 1532930897000,
                                            endTime: 1532930897000,
                                            user: {
                                                _id: "cb5222accd2acec",
                                                email: "luhui@cvte.com",
                                                mobile: "13929561881",
                                                createTime: "1532920897000",
                                                isMailConfig: "true",
                                                avatar: "https://res.maxhub.vip/img/123",
                                                displayName: "账号系统的昵称",
                                                systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                            },
                                            description: "'科珠425'"
                                        }
                                    },
                                    member: {
                                        user: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        },
                                        meeting: "cb5222accd2acec",
                                        createTime: "1532930897000",
                                        state: 0,
                                        from: 0,
                                        invitor: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        }
                                    },
                                    noteContent: "功能设计有遗漏，需要补充业务流程",
                                    noteSubject: "功能设计评审会议记录",
                                    inviteState: 0,
                                    summaryState: 0,
                                    invitor: {
                                        _id: "cb5222accd2acec",
                                        email: "luhui@cvte.com",
                                        mobile: "13929561881",
                                        createTime: "1532920897000",
                                        isMailConfig: "true",
                                        avatar: "https://res.maxhub.vip/img/123",
                                        displayName: "账号系统的昵称",
                                        systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                    }
                                }
                            ]
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/users/{userId}/meeting_records/{meetingId}": {
            delete: {
                description: "删除一条会议记录，只能删除已结束的会议记录",
                summary: "3.4.2 删除会议记录",
                tags: ["3. 用户接口协议"],
                operationId: "ApiUsersMeetingRecordsByUserIdAndMeetingIdDelete",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            },
            patch: {
                description: "更新笔记操作",
                summary: "3.4.1 更新笔记",
                tags: ["3. 用户接口协议"],
                operationId: "ApiUsersMeetingRecordsByUserIdAndMeetingIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/3.4.1更新笔记Request"
                        }
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/users/{userId}/meeting_records/{meetingId}/state/read": {
            patch: {
                description: "标记会议纪要已读，当前仅当会议纪要发布时生效",
                summary: "3.4.3 已读会议纪要",
                tags: ["3. 用户接口协议"],
                operationId: "ApiUsersMeetingRecordsStateReadByUserIdAndMeetingIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meetings/actions/schedule": {
            post: {
                description: "1. 以当前用户的身份预约一个会议\n2. 会议结束时间必须小于开始时间",
                summary: "4.1.1 预约会议",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsActionsSchedulePost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/4.1.1预约会议Request"
                        }
                    }
                ],
                responses: {
                    "201": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/Meeting"
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meetings/actions/immediate": {
            post: {
                description: "用户立即创建一个会议，不用填写任何信息",
                summary: "4.1.2 即时会议",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsActionsImmediatePost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "201": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/Meeting"
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meetings/{meetingId}": {
            get: {
                description: "返回单个会议信息详情",
                summary: "4.2.1 查询会议信息",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsByMeetingIdGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/Meeting"
                        },
                        examples: {
                            "application/json": {
                                _id: "cb5222accd2acec",
                                subject: "交互评审会议",
                                content: "teams 的交互评审",
                                beginTime: "1532920897000",
                                endTime: "1532930897000",
                                address: "科珠425",
                                master: "cb5222accd2acec",
                                creator: "cb5222accd2acec",
                                shareId: "cb5222accd2acec",
                                accessKey: "1234",
                                state: 0,
                                members: [
                                    {
                                        user: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        },
                                        meeting: "cb5222accd2acec",
                                        createTime: "1532930897000",
                                        state: 0,
                                        from: 0,
                                        invitor: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        }
                                    }
                                ],
                                repeatMeeting: "cb5222accd2acec",
                                order: {
                                    orderNo: "1caf9ed93ab36c9ae28",
                                    room: "1caf9ed93ab36c9ae28",
                                    startTime: 1532930897000,
                                    endTime: 1532930897000,
                                    user: {
                                        _id: "cb5222accd2acec",
                                        email: "luhui@cvte.com",
                                        mobile: "13929561881",
                                        createTime: "1532920897000",
                                        isMailConfig: "true",
                                        avatar: "https://res.maxhub.vip/img/123",
                                        displayName: "账号系统的昵称",
                                        systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                    },
                                    description: "'科珠425'"
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            },
            patch: {
                description: "1. 修改会议的基本信息，只需要提供修改的字段即可\n2. 只有主持人才可以修改会议信息\n3. 会议的开始时间必须小于结束时间\n4. 会议结束后，无法修改相关信息",
                summary: "4.2.2 修改会议信息",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsByMeetingIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/4.2.2修改会议信息Request"
                        }
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meetings/{meetingId}/state/cancel": {
            patch: {
                description: "1. 取消会议，同步删除所有人的会议记录。\n2. 只有主持人才有此权限\n3. 会议的 state 值变为2",
                summary: "4.2.3 取消会议/取消预约",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsStateCancelByMeetingIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meetings/{meetingId}/state/finish": {
            patch: {
                description: "1. 会议进入结束状态，进入结束状态的会议才能发布纪要\n2. 只有主持人才有此权限\n3. 会议的 state 值会变为3",
                summary: "4.2.4 结束会议",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsStateFinishByMeetingIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meetings/{meetingId}/members": {
            post: {
                description: "1. 邀请与会人员，会给对应的与会人员发送消息。\n2. 仅支持手机号或者邮箱\n3. 当前用户必须为会议中的成员",
                summary: "4.3.1 邀请与会人员",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsMembersByMeetingIdPost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/InviteMember"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/Meeting"
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meetings/{meetingId}/members/{memberId}": {
            delete: {
                description: "1. memberId 必须为当前用户\n2. 主持人不能退出会议",
                summary: "4.4.1 退出会议",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsMembersByMeetingIdAndMemberIdDelete",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "memberId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "用户ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            },
            patch: {
                description: "1. 修改与会人员的状态，1为拒绝，2为确认，不支持其他状态\n2. memberId 必须为当前用户",
                summary: "4.4.2 确认/拒绝邀请",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsMembersByMeetingIdAndMemberIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/4.4.2确认~1拒绝邀请Request"
                        }
                    },
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "memberId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meetings/{meetingid}/attachments": {
            get: {
                description: "当前用户在与会人员中才可查询",
                summary: "4.4.1 查询附件信息",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsAttachmentsByMeetingidGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingid",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/Attachment"
                            }
                        },
                        examples: {
                            "application/json": [
                                {
                                    downloadUrl: "res.test.maxhub.vip/share.html?s_id=0f205e93-a737-4267-a33d-b44c4d8941c0&locale=zh_CN#/detail/5a66f2ba-85d3-48ee-b6ad-f342ce3b1eaf/record",
                                    _id: "cb5222accd2acec",
                                    meeting: "所处的会议 id",
                                    name: "文件名",
                                    createTime: "1532930897000",
                                    contentType: "jpg",
                                    size: "1024"
                                }
                            ]
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            },
            post: {
                description: "当前用户在与会人员中才可以上传附件",
                summary: "4.4.2 上传附件",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsAttachmentsByMeetingidPost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingid",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/Attachment"
                            }
                        }
                    }
                ],
                responses: {
                    "201": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meetings/{id}/attachments/{shareId}": {
            delete: {
                description: "当前用户在与会人员中才可以上传附件",
                summary: "4.4.3 删除附件",
                tags: ["4. 会议接口协议"],
                operationId: "ApiMeetingsAttachmentsByIdAndShareIdDelete",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingid",
                        in: "query",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "shareId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "在云盘的 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meeting_summaries/{meetingId}/state/publish": {
            patch: {
                description: "1. 只有主持人可以发布会议纪要\n2. 只有填写了地点、人物之后才能发布\n3. 当前用户必须是主持人才可以发布会议纪要",
                summary: "5.1.1 发布会议纪要",
                tags: ["5. 会议纪要"],
                operationId: "ApiMeetingSummariesStatePublishByMeetingIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/5.1.1发布会议纪要Request"
                        }
                    }
                ],
                responses: {
                    "201": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meeting_summaries/{meetingId}": {
            get: {
                description: "1. 只有会议结束时才能获取到会议纪要",
                summary: "5.1.4 获取会议纪要",
                tags: ["5. 会议纪要"],
                operationId: "ApiMeetingSummariesByMeetingIdGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/MeetingSummary"
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            },
            patch: {
                description: "该接口暂不实现\n1. 更新会议纪要，只是保存纪要至服务器，但是不发布，纪要状态仍是草稿。\n2. 只有纪要是草稿状态才能保存。\n3. 只有主持人才能更新会议纪要",
                summary: "5.1.2 更新会议纪要",
                tags: ["5. 会议纪要"],
                operationId: "ApiMeetingSummariesByMeetingIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/5.1.2更新会议纪要Request"
                        }
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/meeting_summaries/{meetingId}/actions/share": {
            post: {
                description: "该接口暂不实现\n1. 分享会议纪要，只有已发布的纪要才能分享。\n2. 只有主持人能分享会议纪要",
                summary: "5.1.3 分享会议纪要",
                tags: ["5. 会议纪要"],
                operationId: "ApiMeetingSummariesActionsShareByMeetingIdPost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "会议ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    "201": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/personal_contacts/{userId}/persons": {
            get: {
                description: "查询当前用户的联系人列表",
                summary: "6.1.2 查询联系人列表",
                tags: ["6. 通讯录"],
                operationId: "ApiPersonalContactsPersonsByUserIdGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "用户 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/ContactPerson"
                            }
                        },
                        examples: {
                            "application/json": [
                                {
                                    person: {
                                        _id: "cb5222accd2acec",
                                        email: "luhui@cvte.com",
                                        mobile: "13929561881",
                                        createTime: "1532920897000",
                                        isMailConfig: "true",
                                        avatar: "https://res.maxhub.vip/img/123",
                                        displayName: "账号系统的昵称",
                                        systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                    },
                                    from: 0,
                                    remark: "二狗子",
                                    createTime: 1532930897000,
                                    userId: "cb5222accd2acec"
                                }
                            ]
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            },
            post: {
                description: "1. 给当前用户添加联系人\n2. 当且仅当联系人已注册，且未添加时添加成功\n3. 不能添加自己\n4. 手机号和邮箱二选一，都传则使用手机号",
                summary: "6.1.1 添加联系人",
                tags: ["6. 通讯录"],
                operationId: "ApiPersonalContactsPersonsByUserIdPost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "用户 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/6.1.1添加联系人Request"
                        }
                    }
                ],
                responses: {
                    "201": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/ContactPerson"
                        },
                        examples: {
                            "application/json": {
                                person: {
                                    _id: "cb5222accd2acec",
                                    email: "luhui@cvte.com",
                                    mobile: "13929561881",
                                    createTime: "1532920897000",
                                    isMailConfig: "true",
                                    avatar: "https://res.maxhub.vip/img/123",
                                    displayName: "账号系统的昵称",
                                    systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                },
                                from: 0,
                                remark: "二狗子",
                                createTime: 1532930897000,
                                userId: "cb5222accd2acec"
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/personal_contacts/{userId}/persons/{personId}": {
            delete: {
                description: "",
                summary: "6.2.1 删除联系人",
                tags: ["6. 通讯录"],
                operationId: "ApiPersonalContactsPersonsByUserIdAndPersonIdDelete",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "用户 id"
                    },
                    {
                        name: "personId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "联系人 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            },
            patch: {
                description: "",
                summary: "6.2.2 修改备注",
                tags: ["6. 通讯录"],
                operationId: "ApiPersonalContactsPersonsByUserIdAndPersonIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "用户 id"
                    },
                    {
                        name: "personId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "联系人 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/personal_contacts/{userId}/teams?page={page}&row={row}": {
            get: {
                description: "",
                summary: "6.3.1 获取我的团队列表",
                tags: ["6. 通讯录"],
                operationId: "ApiPersonalContactsTeamsRowRowByUserIdAndPageGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "用户 id"
                    },
                    {
                        name: "page",
                        in: "path",
                        required: true,
                        type: "number",
                        format: "double",
                        exclusiveMaximum: false,
                        exclusiveMinimum: false,
                        description: "数据分页（本期暂不实现）"
                    },
                    {
                        name: "row",
                        in: "path",
                        required: true,
                        type: "number",
                        format: "double",
                        exclusiveMaximum: false,
                        exclusiveMinimum: false,
                        description: "每页数据数量（本期暂不实现）"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/Team"
                            }
                        },
                        examples: {
                            "application/json": [
                                {
                                    _id: "510663",
                                    name: "1602-teams",
                                    createTime: 1532930897000,
                                    master: "cb5222accd2acec",
                                    members: [
                                        {
                                            user: {
                                                _id: "cb5222accd2acec",
                                                email: "luhui@cvte.com",
                                                mobile: "13929561881",
                                                createTime: "1532920897000",
                                                isMailConfig: "true",
                                                avatar: "https://res.maxhub.vip/img/123",
                                                displayName: "账号系统的昵称",
                                                systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                            },
                                            from: 0,
                                            createTime: "1532930897000",
                                            invitor: {
                                                _id: "cb5222accd2acec",
                                                email: "luhui@cvte.com",
                                                mobile: "13929561881",
                                                createTime: "1532920897000",
                                                isMailConfig: "true",
                                                avatar: "https://res.maxhub.vip/img/123",
                                                displayName: "账号系统的昵称",
                                                systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/teams": {
            post: {
                description: "",
                summary: "7.1.1 创建团队",
                tags: ["7. 团队"],
                operationId: "ApiTeamsPost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/7.1.1创建团队Request"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/Team"
                        },
                        examples: {
                            "application/json": {
                                _id: "510663",
                                name: "1602-teams",
                                createTime: 1532930897000,
                                master: "cb5222accd2acec",
                                members: [
                                    {
                                        user: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        },
                                        from: 0,
                                        createTime: "1532930897000",
                                        invitor: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/teams/teamId": {
            get: {
                description: "1. 只有团队成员能查询团队信息\n2. 成员信息的手机号和邮箱只显示部分信息",
                summary: "7.2.1 查询团队信息",
                tags: ["7. 团队"],
                operationId: "ApiTeamsTeamIdGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "teamId",
                        in: "query",
                        required: true,
                        type: "string",
                        description: "团队 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/Team"
                        },
                        examples: {
                            "application/json": {
                                _id: "510663",
                                name: "1602-teams",
                                createTime: 1532930897000,
                                master: "cb5222accd2acec",
                                members: [
                                    {
                                        user: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        },
                                        from: 0,
                                        createTime: "1532930897000",
                                        invitor: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            },
            patch: {
                description: "",
                summary: "7.2.2 修改团队信息",
                tags: ["7. 团队"],
                operationId: "ApiTeamsTeamIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "teamId",
                        in: "query",
                        required: true,
                        type: "string",
                        description: "团队 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            type: "object"
                        }
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/teams/{teamId}/members": {
            post: {
                description: "1. 邀请团队成员，同时发送邀请通知\n2. 当前用户必须在团队里才可以邀请团队成员",
                summary: "7.3.1 邀请团队成员",
                tags: ["7. 团队"],
                operationId: "ApiTeamsMembersByTeamIdPost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "teamId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "团队 ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/InviteMember"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/Team"
                        },
                        examples: {
                            "application/json": {
                                _id: "510663",
                                name: "1602-teams",
                                createTime: 1532930897000,
                                master: "cb5222accd2acec",
                                members: [
                                    {
                                        user: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        },
                                        from: 0,
                                        createTime: "1532930897000",
                                        invitor: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorInviteTeamMemberFail"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: "invite fail, mail not config",
                                failUsers: [
                                    {
                                        email: "luhui@cvte.com"
                                    }
                                ]
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/teams/{teamId}/members/actions/join": {
            post: {
                description: "如果当前用户已在团队里，则直接返回200，否则返回201",
                summary: "7.3.2 加入团队",
                tags: ["7. 团队"],
                operationId: "ApiTeamsMembersActionsJoinByTeamIdPost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "teamId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "团队 ID"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/Team"
                        },
                        examples: {
                            "application/json": {
                                _id: "510663",
                                name: "1602-teams",
                                createTime: 1532930897000,
                                master: "cb5222accd2acec",
                                members: [
                                    {
                                        user: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        },
                                        from: 0,
                                        createTime: "1532930897000",
                                        invitor: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/teams/{teamId}/members/{userId}": {
            delete: {
                description: "1. 所有成员退出后，团队自动删除\n2. userId 只能为当前用户",
                summary: "7.2.3 退出团队",
                tags: ["7. 团队"],
                operationId: "ApiTeamsMembersByTeamIdAndUserIdDelete",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "teamId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "团队 ID"
                    },
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "当前用户 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "204": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/notifications?noAck={noAck}&page={page}&row={row}&receiver={userId}": {
            get: {
                description: "查询发给自己的消息",
                summary: "8.1.1 查询发送给自己的消息",
                tags: ["8. 通知"],
                operationId: "ApiNotificationsRowRowReceiverUserIdByNoAckAndPageGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "noAck",
                        in: "path",
                        required: true,
                        type: "boolean",
                        description: "true 则只查询未读的消息"
                    },
                    {
                        name: "page",
                        in: "path",
                        required: true,
                        type: "number",
                        format: "double",
                        exclusiveMaximum: false,
                        exclusiveMinimum: false,
                        description: "\b消息的页数，page 和 row 必须同时设置（当前版本暂不实现）"
                    },
                    {
                        name: "row",
                        in: "path",
                        required: true,
                        type: "number",
                        format: "double",
                        exclusiveMaximum: false,
                        exclusiveMinimum: false,
                        description: "每页消息的个数，page 和 row 必须同时设置（当前版本暂不实现）"
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/Notification"
                            }
                        },
                        examples: {
                            "application/json": [
                                {
                                    _id: "cb5222accd2acec",
                                    content: "会议即将开始",
                                    type: 1,
                                    ack: "true"
                                }
                            ]
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/operation_records": {
            get: {
                description: "",
                summary: "9.1.1 查询操作记录",
                tags: ["9. 操作记录"],
                operationId: "ApiOperationRecordsGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/OperationRecord"
                            }
                        },
                        examples: {
                            "application/json": [
                                {
                                    attribute: "/meetings/meetingId/subject",
                                    preValue: "交互评审会议",
                                    curValue: "【评审】teams 交互",
                                    meetingId: "cb5222accd2acec",
                                    modifyUserId: "cb5222accd2acec"
                                }
                            ]
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/repeat_meetings": {
            post: {
                description: "1. 创建重复会议时，批量创建会议\n2. 修改信息时，会批量修改对应的会议信息\n3. 重复时间不能超过当前时间1个月\n4. 开始时间不能小于当前时间\n5. 首次开始时间必须大于首次结束时间\n6. 重复会议结束时间必须大于首次结束时间",
                summary: "10.1.1 创建重复会议",
                tags: ["10. 重复会议"],
                operationId: "ApiRepeatMeetingsPost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/10.1.1创建重复会议Request"
                        }
                    }
                ],
                responses: {
                    "201": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/RepeatMeeting"
                        },
                        examples: {
                            "application/json": {
                                subject: "交互评审",
                                content: "teams 一期交互评审",
                                beginTime: 1532920897000,
                                endTime: 1532930897000,
                                address: "科珠425",
                                room: {
                                    id: "1caf9ed93ab36c9ae28",
                                    name: "324",
                                    area: "科珠",
                                    description: "科珠324"
                                },
                                members: [
                                    {
                                        _id: "1caf9ed93ab36c9ae28-1caf9ed93ab36c9ae28",
                                        user: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        },
                                        repeatMeeting: "1caf9ed93ab36c9ae28",
                                        from: 0,
                                        invitor: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        }
                                    }
                                ],
                                repeatEndTime: 1532920897000,
                                repeatType: 0,
                                repeatValue: 1,
                                master: "1caf9ed93ab36c9ae28",
                                creator: "1caf9ed93ab36c9ae28",
                                state: 0
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/repeat_meetings/{repeat_meeting_id}": {
            get: {
                description: "",
                summary: "10.2.3 查询重复会议信息",
                tags: ["10. 重复会议"],
                operationId: "ApiRepeatMeetingsByRepeatMeetingIdGet",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "repeat_meeting_id",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "重复会议 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/RepeatMeeting"
                        },
                        examples: {
                            "application/json": {
                                subject: "交互评审",
                                content: "teams 一期交互评审",
                                beginTime: 1532920897000,
                                endTime: 1532930897000,
                                address: "科珠425",
                                room: {
                                    id: "1caf9ed93ab36c9ae28",
                                    name: "324",
                                    area: "科珠",
                                    description: "科珠324"
                                },
                                members: [
                                    {
                                        _id: "1caf9ed93ab36c9ae28-1caf9ed93ab36c9ae28",
                                        user: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        },
                                        repeatMeeting: "1caf9ed93ab36c9ae28",
                                        from: 0,
                                        invitor: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        }
                                    }
                                ],
                                repeatEndTime: 1532920897000,
                                repeatType: 0,
                                repeatValue: 1,
                                master: "1caf9ed93ab36c9ae28",
                                creator: "1caf9ed93ab36c9ae28",
                                state: 0
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            },
            delete: {
                description: "1. 只有主持人能取消会议",
                summary: "10.2.1 取消会议",
                tags: ["10. 重复会议"],
                operationId: "ApiRepeatMeetingsByRepeatMeetingIdDelete",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "repeat_meeting_id",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "重复会议 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            },
            patch: {
                description: "1. 只有会议成员才能修改\n2. 修改信息时，会批量修改对应的会议信息\n3. 重复时间不能超过当前时间1个月\n4. 开始时间不能小于当前时间\n5. 首次开始时间必须大于首次结束时间\n6. 重复会议结束时间必须大于首次结束时间",
                summary: "10.2.2 修改重复会议信息",
                tags: ["10. 重复会议"],
                operationId: "ApiRepeatMeetingsByRepeatMeetingIdPatch",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "repeat_meeting_id",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "重复会议 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/10.2.2修改重复会议信息Request"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/repeat_meetings/{repeat_meeting_id}/repeat_meeting_members": {
            post: {
                description: "",
                summary: "10.3.1 添加重复会议成员",
                tags: ["10. 重复会议"],
                operationId: "ApiRepeatMeetingsRepeatMeetingMembersByRepeatMeetingIdPost",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "repeat_meeting_id",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "重复会议 id"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/InviteMember"
                        }
                    }
                ],
                responses: {
                    "201": {
                        description: "",
                        schema: {
                            $ref: "#/definitions/RepeatMeeting"
                        },
                        examples: {
                            "application/json": {
                                subject: "交互评审",
                                content: "teams 一期交互评审",
                                beginTime: 1532920897000,
                                endTime: 1532930897000,
                                address: "科珠425",
                                room: {
                                    id: "1caf9ed93ab36c9ae28",
                                    name: "324",
                                    area: "科珠",
                                    description: "科珠324"
                                },
                                members: [
                                    {
                                        _id: "1caf9ed93ab36c9ae28-1caf9ed93ab36c9ae28",
                                        user: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        },
                                        repeatMeeting: "1caf9ed93ab36c9ae28",
                                        from: 0,
                                        invitor: {
                                            _id: "cb5222accd2acec",
                                            email: "luhui@cvte.com",
                                            mobile: "13929561881",
                                            createTime: "1532920897000",
                                            isMailConfig: "true",
                                            avatar: "https://res.maxhub.vip/img/123",
                                            displayName: "账号系统的昵称",
                                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                                        }
                                    }
                                ],
                                repeatEndTime: 1532920897000,
                                repeatType: 0,
                                repeatValue: 1,
                                master: "1caf9ed93ab36c9ae28",
                                creator: "1caf9ed93ab36c9ae28",
                                state: 0
                            }
                        }
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        },
        "/api/repeat_meetings/{repeat_meetingId}/repeat_meeting_members/{repeat_meeting_member_id}": {
            delete: {
                description: "",
                summary: "10.4.1 退出重复会议",
                tags: ["10. 重复会议"],
                operationId: "ApiRepeatMeetingsRepeatMeetingMembersByRepeatMeetingIdAndRepeatMeetingMemberIdDelete",
                produces: ["application/json"],
                parameters: [
                    {
                        name: "repeat_meeting_id",
                        in: "query",
                        required: true,
                        type: "string",
                        description: "重复会议 id"
                    },
                    {
                        name: "repeat_meeting_member_id",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "重复会议成员 userId"
                    },
                    {
                        name: "Content-Type",
                        in: "header",
                        required: true,
                        type: "string",
                        description: ""
                    },
                    {
                        name: "body",
                        in: "body",
                        required: true,
                        description: "",
                        schema: {
                            $ref: "#/definitions/InviteMember"
                        }
                    },
                    {
                        name: "repeat_meetingId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: ""
                    }
                ],
                responses: {
                    "200": {
                        description: ""
                    },
                    "400": {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    },
                    default: {
                        description: "Unexpected error in API call. See HTTP response body for details.",
                        schema: {
                            $ref: "#/definitions/ErrorMessage"
                        },
                        examples: {
                            "application/json": {
                                code: 4001001,
                                message: ""
                            }
                        }
                    }
                },
                security: [
                    {
                        auth: []
                    }
                ]
            }
        }
    },
    definitions: {
        SuccessMessage: {
            title: "SuccessMessage",
            type: "object",
            properties: {
                message: {
                    description: "成功描述内容",
                    example: "ok",
                    type: "string"
                }
            }
        },
        Account: {
            title: "Account",
            example: {
                _id: "cb5222accd2acec",
                systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a",
                access_token: "f14454c5-83b5-4611-bf47-a9a486824983",
                refresh_token: "f14454c5-83b5-4611-bf47-a9a486824983",
                expires_in: "1209600",
                token_type: "Bearer",
                email: "luhui@cvte.com",
                mobile: "13929561881",
                createTime: "1532920897000",
                isMailConfig: "true",
                avatar: "https://res.maxhub.vip/img/123",
                displayName: "账号系统的昵称"
            },
            type: "object",
            properties: {
                _id: {
                    description: "用户 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                systemId: {
                    description: "对应账号系统的 id",
                    example: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a",
                    type: "string"
                },
                access_token: {
                    description: "用户访问令牌",
                    example: "f14454c5-83b5-4611-bf47-a9a486824983",
                    type: "string"
                },
                refresh_token: {
                    description: "刷新令牌，用于刷新访问令牌的有效期",
                    example: "f14454c5-83b5-4611-bf47-a9a486824983",
                    type: "string"
                },
                expires_in: {
                    description: "令牌有效期，单位秒。一般为1209600，即14天。",
                    example: "1209600",
                    type: "string"
                },
                token_type: {
                    description: "令牌类型",
                    example: "Bearer",
                    type: "string"
                },
                email: {
                    description: "邮箱",
                    example: "luhui@cvte.com",
                    type: "string"
                },
                mobile: {
                    description: "手机号",
                    example: "13929561881",
                    type: "string"
                },
                createTime: {
                    description: "用户创建时间",
                    example: "1532920897000",
                    type: "string"
                },
                isMailConfig: {
                    description: "邮箱是否配置",
                    example: "true",
                    type: "string"
                },
                avatar: {
                    description: "头像地址",
                    example: "https://res.maxhub.vip/img/123",
                    type: "string"
                },
                displayName: {
                    description: "用户昵称",
                    example: "账号系统的昵称",
                    type: "string"
                }
            }
        },
        User: {
            title: "User",
            example: {
                _id: "cb5222accd2acec",
                email: "luhui@cvte.com",
                mobile: "13929561881",
                createTime: "1532920897000",
                isMailConfig: "true",
                avatar: "https://res.maxhub.vip/img/123",
                displayName: "账号系统的昵称",
                systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
            },
            type: "object",
            properties: {
                _id: {
                    description: "用户 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                email: {
                    description: "邮箱",
                    example: "luhui@cvte.com",
                    type: "string"
                },
                mobile: {
                    description: "手机号",
                    example: "13929561881",
                    type: "string"
                },
                createTime: {
                    description: "用户创建时间",
                    example: "1532920897000",
                    type: "string"
                },
                isMailConfig: {
                    description: "邮箱是否配置",
                    example: "true",
                    type: "string"
                },
                avatar: {
                    description: "头像地址",
                    example: "https://res.maxhub.vip/img/123",
                    type: "string"
                },
                displayName: {
                    description: "用户昵称",
                    example: "账号系统的昵称",
                    type: "string"
                },
                systemId: {
                    description: "对应账号系统的 id",
                    example: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a",
                    type: "string"
                }
            }
        },
        Meeting: {
            title: "Meeting",
            example: {
                _id: "cb5222accd2acec",
                subject: "交互评审会议",
                content: "teams 的交互评审",
                beginTime: "1532920897000",
                endTime: "1532930897000",
                address: "科珠425",
                master: "cb5222accd2acec",
                creator: "cb5222accd2acec",
                shareId: "cb5222accd2acec",
                accessKey: "1234",
                state: 0,
                members: [
                    {
                        user: {
                            _id: "cb5222accd2acec",
                            email: "luhui@cvte.com",
                            mobile: "13929561881",
                            createTime: "1532920897000",
                            isMailConfig: "true",
                            avatar: "https://res.maxhub.vip/img/123",
                            displayName: "账号系统的昵称",
                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                        },
                        meeting: "cb5222accd2acec",
                        createTime: "1532930897000",
                        state: 0,
                        from: 0,
                        invitor: {
                            _id: "cb5222accd2acec",
                            email: "luhui@cvte.com",
                            mobile: "13929561881",
                            createTime: "1532920897000",
                            isMailConfig: "true",
                            avatar: "https://res.maxhub.vip/img/123",
                            displayName: "账号系统的昵称",
                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                        }
                    }
                ],
                repeatMeeting: "cb5222accd2acec",
                order: {
                    orderNo: "1caf9ed93ab36c9ae28",
                    room: "1caf9ed93ab36c9ae28",
                    startTime: 1532930897000,
                    endTime: 1532930897000,
                    user: {
                        _id: "cb5222accd2acec",
                        email: "luhui@cvte.com",
                        mobile: "13929561881",
                        createTime: "1532920897000",
                        isMailConfig: "true",
                        avatar: "https://res.maxhub.vip/img/123",
                        displayName: "账号系统的昵称",
                        systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                    },
                    description: "'科珠425'"
                }
            },
            type: "object",
            properties: {
                _id: {
                    description: "会议 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                subject: {
                    description: "会议主题",
                    example: "交互评审会议",
                    type: "string"
                },
                content: {
                    description: "会议的内容描述",
                    example: "teams 的交互评审",
                    type: "string"
                },
                beginTime: {
                    description: "会议开始时间",
                    example: "1532920897000",
                    type: "string"
                },
                endTime: {
                    description: "会议结束时间",
                    example: "1532930897000",
                    type: "string"
                },
                address: {
                    description: "会议地点",
                    example: "科珠425",
                    type: "string"
                },
                master: {
                    description: "主持人 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                creator: {
                    description: "会议创建者 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                shareId: {
                    description: "云盘共享空间 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                accessKey: {
                    description: "共享空间的访问秘钥",
                    example: "1234",
                    type: "string"
                },
                state: {
                    $ref: "#/definitions/MeetingState"
                },
                members: {
                    description: "",
                    type: "array",
                    items: {
                        $ref: "#/definitions/MeetingMember"
                    }
                },
                repeatMeeting: {
                    description: "关联的重复会议 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                order: {
                    $ref: "#/definitions/RoomOrder"
                }
            }
        },
        MeetingState: {
            title: "MeetingState",
            example: 0,
            type: "integer",
            format: "int32",
            enum: ["0", "1", "2", "3", "4"]
        },
        MeetingMember: {
            title: "MeetingMember",
            type: "object",
            properties: {
                user: {
                    $ref: "#/definitions/User"
                },
                meeting: {
                    description: "会议 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                createTime: {
                    description: "加入会议的时间",
                    example: "1532930897000",
                    type: "string"
                },
                state: {
                    $ref: "#/definitions/MemberState"
                },
                from: {
                    $ref: "#/definitions/From"
                },
                invitor: {
                    $ref: "#/definitions/User"
                }
            }
        },
        MemberState: {
            title: "MemberState",
            example: 0,
            type: "integer",
            format: "int32",
            enum: ["0", "1", "2"]
        },
        From: {
            title: "From",
            example: 0,
            type: "integer",
            format: "int32",
            enum: ["0", "1", "2"]
        },
        RoomOrder: {
            title: "RoomOrder",
            type: "object",
            properties: {
                orderNo: {
                    description: "订单 id",
                    example: "1caf9ed93ab36c9ae28",
                    type: "string"
                },
                room: {
                    description: "会议室 id",
                    example: "1caf9ed93ab36c9ae28",
                    type: "string"
                },
                startTime: {
                    description: "开始时间",
                    example: 1532930897000,
                    type: "number",
                    format: "double"
                },
                endTime: {
                    description: "结束时间",
                    example: 1532930897000,
                    type: "number",
                    format: "double"
                },
                user: {
                    $ref: "#/definitions/User"
                },
                description: {
                    description: "订单描述",
                    example: "'科珠425'",
                    type: "string"
                }
            }
        },
        OperationRecord: {
            title: "OperationRecord",
            example: {
                attribute: "/meetings/meetingId/subject",
                preValue: "交互评审会议",
                curValue: "【评审】teams 交互",
                meetingId: "cb5222accd2acec",
                modifyUserId: "cb5222accd2acec"
            },
            type: "object",
            properties: {
                attribute: {
                    description: "修改的属性/对象",
                    example: "/meetings/meetingId/subject",
                    type: "string"
                },
                preValue: {
                    description: "修改前的值",
                    example: "交互评审会议",
                    type: "string"
                },
                curValue: {
                    description: "修改后的值",
                    example: "【评审】teams 交互",
                    type: "string"
                },
                meetingId: {
                    description: "会议 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                modifyUserId: {
                    description: "修改人 id",
                    example: "cb5222accd2acec",
                    type: "string"
                }
            }
        },
        Attachment: {
            title: "Attachment",
            example: {
                downloadUrl: "res.test.maxhub.vip/share.html?s_id=0f205e93-a737-4267-a33d-b44c4d8941c0&locale=zh_CN#/detail/5a66f2ba-85d3-48ee-b6ad-f342ce3b1eaf/record",
                _id: "cb5222accd2acec",
                meeting: "所处的会议 id",
                name: "文件名",
                createTime: "1532930897000",
                contentType: "jpg",
                size: "1024"
            },
            type: "object",
            properties: {
                downloadUrl: {
                    description: "附件地址",
                    example: "res.test.maxhub.vip/share.html?s_id=0f205e93-a737-4267-a33d-b44c4d8941c0&locale=zh_CN#/detail/5a66f2ba-85d3-48ee-b6ad-f342ce3b1eaf/record",
                    type: "string"
                },
                _id: {
                    description: "附件存储在云盘的 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                meeting: {
                    description: "",
                    example: "所处的会议 id",
                    type: "string"
                },
                name: {
                    description: "",
                    example: "文件名",
                    type: "string"
                },
                createTime: {
                    description: "文件上传时间",
                    example: "1532930897000",
                    type: "string"
                },
                contentType: {
                    description: "文件类型",
                    example: "jpg",
                    type: "string"
                },
                size: {
                    description: "文件大小（字节）",
                    example: "1024",
                    type: "string"
                }
            }
        },
        NoteState: {
            title: "NoteState",
            example: 0,
            type: "integer",
            format: "int32",
            enum: ["0", "1", "2"]
        },
        ContactPerson: {
            title: "ContactPerson",
            example: {
                person: {
                    _id: "cb5222accd2acec",
                    email: "luhui@cvte.com",
                    mobile: "13929561881",
                    createTime: "1532920897000",
                    isMailConfig: "true",
                    avatar: "https://res.maxhub.vip/img/123",
                    displayName: "账号系统的昵称",
                    systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                },
                from: 0,
                remark: "二狗子",
                createTime: 1532930897000,
                userId: "cb5222accd2acec"
            },
            type: "object",
            properties: {
                person: {
                    $ref: "#/definitions/User"
                },
                from: {
                    $ref: "#/definitions/From"
                },
                remark: {
                    description: "备注",
                    example: "二狗子",
                    type: "string"
                },
                createTime: {
                    description: "创建时间",
                    example: 1532930897000,
                    type: "number",
                    format: "double"
                },
                userId: {
                    description: "所属用户 id",
                    example: "cb5222accd2acec",
                    type: "string"
                }
            }
        },
        Team: {
            title: "Team",
            example: {
                _id: "510663",
                name: "1602-teams",
                createTime: 1532930897000,
                master: "cb5222accd2acec",
                members: [
                    {
                        user: {
                            _id: "cb5222accd2acec",
                            email: "luhui@cvte.com",
                            mobile: "13929561881",
                            createTime: "1532920897000",
                            isMailConfig: "true",
                            avatar: "https://res.maxhub.vip/img/123",
                            displayName: "账号系统的昵称",
                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                        },
                        from: 0,
                        createTime: "1532930897000",
                        invitor: {
                            _id: "cb5222accd2acec",
                            email: "luhui@cvte.com",
                            mobile: "13929561881",
                            createTime: "1532920897000",
                            isMailConfig: "true",
                            avatar: "https://res.maxhub.vip/img/123",
                            displayName: "账号系统的昵称",
                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                        }
                    }
                ]
            },
            type: "object",
            properties: {
                _id: {
                    description: "团队 id",
                    example: "510663",
                    type: "string"
                },
                name: {
                    description: "团队名称",
                    example: "1602-teams",
                    type: "string"
                },
                createTime: {
                    description: "创建时间",
                    example: 1532930897000,
                    type: "number",
                    format: "double"
                },
                master: {
                    description: "创建者 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                members: {
                    description: "",
                    type: "array",
                    items: {
                        $ref: "#/definitions/TeamMember"
                    }
                }
            }
        },
        TeamMember: {
            title: "TeamMember",
            type: "object",
            properties: {
                user: {
                    $ref: "#/definitions/User"
                },
                from: {
                    $ref: "#/definitions/From"
                },
                createTime: {
                    description: "成员加入时间",
                    example: "1532930897000",
                    type: "string"
                },
                invitor: {
                    $ref: "#/definitions/User"
                }
            }
        },
        Notification: {
            title: "Notification",
            example: {
                _id: "cb5222accd2acec",
                content: "会议即将开始",
                type: 1,
                ack: "true"
            },
            type: "object",
            properties: {
                _id: {
                    description: "通知 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                content: {
                    description: "消息内容",
                    example: "会议即将开始",
                    type: "string"
                },
                type: {
                    $ref: "#/definitions/NotificationType"
                },
                ack: {
                    description: "是否接收到消息",
                    example: "true",
                    type: "string"
                }
            }
        },
        NotificationType: {
            title: "NotificationType",
            example: 1,
            type: "integer",
            format: "int32",
            enum: ["1", "2", "3", "4", "5", "6"]
        },
        MeetingRecord: {
            title: "MeetingRecord",
            example: {
                user: "cb5222accd2acec",
                meeting: {
                    _id: "cb5222accd2acec",
                    subject: "交互评审会议",
                    content: "teams 的交互评审",
                    beginTime: "1532920897000",
                    endTime: "1532930897000",
                    address: "科珠425",
                    master: "cb5222accd2acec",
                    creator: "cb5222accd2acec",
                    shareId: "cb5222accd2acec",
                    accessKey: "1234",
                    state: 0,
                    members: [
                        {
                            user: {
                                _id: "cb5222accd2acec",
                                email: "luhui@cvte.com",
                                mobile: "13929561881",
                                createTime: "1532920897000",
                                isMailConfig: "true",
                                avatar: "https://res.maxhub.vip/img/123",
                                displayName: "账号系统的昵称",
                                systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                            },
                            meeting: "cb5222accd2acec",
                            createTime: "1532930897000",
                            state: 0,
                            from: 0,
                            invitor: {
                                _id: "cb5222accd2acec",
                                email: "luhui@cvte.com",
                                mobile: "13929561881",
                                createTime: "1532920897000",
                                isMailConfig: "true",
                                avatar: "https://res.maxhub.vip/img/123",
                                displayName: "账号系统的昵称",
                                systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                            }
                        }
                    ],
                    repeatMeeting: "cb5222accd2acec",
                    order: {
                        orderNo: "1caf9ed93ab36c9ae28",
                        room: "1caf9ed93ab36c9ae28",
                        startTime: 1532930897000,
                        endTime: 1532930897000,
                        user: {
                            _id: "cb5222accd2acec",
                            email: "luhui@cvte.com",
                            mobile: "13929561881",
                            createTime: "1532920897000",
                            isMailConfig: "true",
                            avatar: "https://res.maxhub.vip/img/123",
                            displayName: "账号系统的昵称",
                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                        },
                        description: "'科珠425'"
                    }
                },
                member: {
                    user: {
                        _id: "cb5222accd2acec",
                        email: "luhui@cvte.com",
                        mobile: "13929561881",
                        createTime: "1532920897000",
                        isMailConfig: "true",
                        avatar: "https://res.maxhub.vip/img/123",
                        displayName: "账号系统的昵称",
                        systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                    },
                    meeting: "cb5222accd2acec",
                    createTime: "1532930897000",
                    state: 0,
                    from: 0,
                    invitor: {
                        _id: "cb5222accd2acec",
                        email: "luhui@cvte.com",
                        mobile: "13929561881",
                        createTime: "1532920897000",
                        isMailConfig: "true",
                        avatar: "https://res.maxhub.vip/img/123",
                        displayName: "账号系统的昵称",
                        systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                    }
                },
                noteContent: "功能设计有遗漏，需要补充业务流程",
                noteSubject: "功能设计评审会议记录",
                inviteState: 0,
                summaryState: 0,
                invitor: {
                    _id: "cb5222accd2acec",
                    email: "luhui@cvte.com",
                    mobile: "13929561881",
                    createTime: "1532920897000",
                    isMailConfig: "true",
                    avatar: "https://res.maxhub.vip/img/123",
                    displayName: "账号系统的昵称",
                    systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                }
            },
            type: "object",
            properties: {
                user: {
                    description: "用户 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                meeting: {
                    $ref: "#/definitions/Meeting"
                },
                member: {
                    $ref: "#/definitions/MeetingMember"
                },
                noteContent: {
                    description: "我的会议笔记",
                    example: "功能设计有遗漏，需要补充业务流程",
                    type: "string"
                },
                noteSubject: {
                    description: "我的会议笔记主题",
                    example: "功能设计评审会议记录",
                    type: "string"
                },
                inviteState: {
                    $ref: "#/definitions/MemberState"
                },
                summaryState: {
                    $ref: "#/definitions/NoteState"
                },
                invitor: {
                    $ref: "#/definitions/User"
                }
            }
        },
        MeetingSummary: {
            title: "MeetingSummary",
            type: "object",
            properties: {
                _id: {
                    description: "会议 id",
                    example: "cb5222accd2acec",
                    type: "string"
                },
                subject: {
                    description: "会议纪要主题",
                    example: "会议纪要主题",
                    type: "string"
                },
                content: {
                    description: "会议纪要内容",
                    example: "会议决议",
                    type: "string"
                },
                state: {
                    $ref: "#/definitions/NoteState"
                }
            }
        },
        ErrorInviteTeamMemberFailUser: {
            title: "ErrorInviteTeamMemberFailUser",
            type: "object",
            properties: {
                email: {
                    description: "邮箱",
                    example: "luhui@cvte.com",
                    type: "string"
                }
            }
        },
        InviteMember: {
            title: "InviteMember",
            type: "object",
            properties: {
                mobiles: {
                    description: "通过手机添加",
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                emails: {
                    description: "通过邮箱添加",
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                ids: {
                    description: "通过 id 添加，未注册的 id 将被忽略",
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            }
        },
        RepeatMeeting: {
            title: "RepeatMeeting",
            example: {
                subject: "交互评审",
                content: "teams 一期交互评审",
                beginTime: 1532920897000,
                endTime: 1532930897000,
                address: "科珠425",
                room: {
                    id: "1caf9ed93ab36c9ae28",
                    name: "324",
                    area: "科珠",
                    description: "科珠324"
                },
                members: [
                    {
                        _id: "1caf9ed93ab36c9ae28-1caf9ed93ab36c9ae28",
                        user: {
                            _id: "cb5222accd2acec",
                            email: "luhui@cvte.com",
                            mobile: "13929561881",
                            createTime: "1532920897000",
                            isMailConfig: "true",
                            avatar: "https://res.maxhub.vip/img/123",
                            displayName: "账号系统的昵称",
                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                        },
                        repeatMeeting: "1caf9ed93ab36c9ae28",
                        from: 0,
                        invitor: {
                            _id: "cb5222accd2acec",
                            email: "luhui@cvte.com",
                            mobile: "13929561881",
                            createTime: "1532920897000",
                            isMailConfig: "true",
                            avatar: "https://res.maxhub.vip/img/123",
                            displayName: "账号系统的昵称",
                            systemId: "cb5222ac-cd2a-11e7-abc4-cec278b6b50a"
                        }
                    }
                ],
                repeatEndTime: 1532920897000,
                repeatType: 0,
                repeatValue: 1,
                master: "1caf9ed93ab36c9ae28",
                creator: "1caf9ed93ab36c9ae28",
                state: 0
            },
            type: "object",
            properties: {
                subject: {
                    description: "会议标题",
                    example: "交互评审",
                    type: "string"
                },
                content: {
                    description: "会议内容",
                    example: "teams 一期交互评审",
                    type: "string"
                },
                beginTime: {
                    description: "首次会议开始时间，unix时间戳，单位毫秒",
                    example: 1532920897000,
                    type: "number",
                    format: "double"
                },
                endTime: {
                    description: "首次会议结束时间，unix时间戳，单位毫秒",
                    example: 1532930897000,
                    type: "number",
                    format: "double"
                },
                address: {
                    description: "会议地点",
                    example: "科珠425",
                    type: "string"
                },
                room: {
                    $ref: "#/definitions/Room"
                },
                members: {
                    description: "",
                    type: "array",
                    items: {
                        $ref: "#/definitions/RepeatMeetingMember"
                    }
                },
                repeatEndTime: {
                    description: "重复会议结束时时间，unix时间戳，单位毫秒",
                    example: 1532920897000,
                    type: "number",
                    format: "double"
                },
                repeatType: {
                    description: "重复类型，0为日，1为周",
                    example: 0,
                    type: "number",
                    format: "double"
                },
                repeatValue: {
                    description: "如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7",
                    example: 1,
                    type: "number",
                    format: "double"
                },
                master: {
                    description: "主持人",
                    example: "1caf9ed93ab36c9ae28",
                    type: "string"
                },
                creator: {
                    description: "创建者",
                    example: "1caf9ed93ab36c9ae28",
                    type: "string"
                },
                state: {
                    description: "重复会议状态，0为使用中，1为取消",
                    example: 0,
                    type: "number",
                    format: "double"
                }
            }
        },
        Room: {
            title: "Room",
            type: "object",
            properties: {
                id: {
                    description: "会议室 id",
                    example: "1caf9ed93ab36c9ae28",
                    type: "string"
                },
                name: {
                    description: "会议室名称",
                    example: "324",
                    type: "string"
                },
                area: {
                    description: "会议室所在区域",
                    example: "科珠",
                    type: "string"
                },
                description: {
                    description: "会议室描述",
                    example: "科珠324",
                    type: "string"
                }
            }
        },
        RepeatMeetingMember: {
            title: "RepeatMeetingMember",
            type: "object",
            properties: {
                _id: {
                    description: "重复会议与会人员 id",
                    example: "1caf9ed93ab36c9ae28-1caf9ed93ab36c9ae28",
                    type: "string"
                },
                user: {
                    $ref: "#/definitions/User"
                },
                repeatMeeting: {
                    description: "关联的重复会议",
                    example: "1caf9ed93ab36c9ae28",
                    type: "string"
                },
                from: {
                    $ref: "#/definitions/From"
                },
                invitor: {
                    $ref: "#/definitions/User"
                }
            }
        },
        ErrorMessage: {
            title: "ErrorMessage",
            example: {
                code: 4001001,
                message: ""
            },
            type: "object",
            properties: {
                code: {
                    description: "错误码",
                    example: 4001001,
                    type: "number",
                    format: "double"
                },
                message: {
                    description: "错误内容",
                    type: "string"
                }
            }
        },
        "3.2.1配置邮箱Request": {
            title: "3.2.1 配置邮箱 request",
            type: "object",
            properties: {
                email: {
                    description: "邮箱",
                    example: "luhui@cvte.com",
                    type: "string"
                },
                username: {
                    description: "邮箱的用户名base64编码，不填写则默认提取邮箱的名称",
                    example: "base64(luhui)",
                    type: "string"
                },
                password: {
                    description: "邮箱的密码",
                    example: "base64(12345678)",
                    type: "string"
                },
                smtpServer: {
                    description: "发件服务器",
                    example: "smtp.cvte.com",
                    type: "string"
                },
                smtpPort: {
                    description: "发件服务器端口",
                    example: 25,
                    type: "number",
                    format: "double"
                }
            },
            required: ["email", "password"]
        },
        "3.4.1更新笔记Request": {
            title: "3.4.1 更新笔记 request",
            type: "object",
            properties: {
                noteContent: {
                    description: "更新我的笔记内容",
                    example: "我的笔记内容",
                    type: "string"
                },
                noteSubject: {
                    description: "更新我的笔记主题",
                    example: "我的笔记标题",
                    type: "string"
                }
            }
        },
        "4.1.1预约会议Request": {
            title: "4.1.1 预约会议 request",
            type: "object",
            properties: {
                subject: {
                    description: "会议标题",
                    example: "交互评审",
                    type: "string"
                },
                content: {
                    description: "会议内容",
                    example: "teams 一期交互评审",
                    type: "string"
                },
                beginTime: {
                    description: "会议开始时间，unix时间戳，单位毫秒",
                    example: 1532920897000,
                    type: "number",
                    format: "double"
                },
                endTime: {
                    description: "会议结束时间，unix时间戳，单位毫秒",
                    example: 1532930897000,
                    type: "number",
                    format: "double"
                },
                address: {
                    description: "会议地点",
                    example: "科珠425",
                    type: "string"
                },
                members: {
                    $ref: "#/definitions/InviteMember"
                },
                attachments: {
                    description: "",
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            },
            required: ["subject", "beginTime", "endTime"]
        },
        "4.2.2修改会议信息Request": {
            title: "4.2.2 修改会议信息 request",
            type: "object",
            properties: {
                subject: {
                    description: "会议主题",
                    example: "交互评审会议",
                    type: "string"
                },
                content: {
                    description: "会议的内容描述",
                    example: "teams 的交互评审",
                    type: "string"
                },
                beginTime: {
                    description: "会议开始时间",
                    example: 1532920897000,
                    type: "number",
                    format: "double"
                },
                endTime: {
                    description: "会议结束时间",
                    example: 1532930897000,
                    type: "number",
                    format: "double"
                },
                address: {
                    description: "会议地点",
                    example: "科珠425",
                    type: "string"
                }
            }
        },
        "4.4.2确认/拒绝邀请Request": {
            title: "4.4.2 确认/拒绝邀请 request",
            type: "object",
            properties: {
                state: {
                    description: "邀请状态，1为拒绝，2为确认",
                    example: 2,
                    type: "number",
                    format: "double"
                }
            },
            required: ["state"]
        },
        "5.1.1发布会议纪要Request": {
            title: "5.1.1 发布会议纪要 request",
            type: "object",
            properties: {
                subject: {
                    description: "会议纪要标题",
                    example: "'交互评审结论'",
                    type: "string"
                },
                content: {
                    description: "会议纪要内容",
                    example: "'砍需求'",
                    type: "string"
                }
            },
            required: ["subject", "content"]
        },
        "5.1.2更新会议纪要Request": {
            title: "5.1.2 更新会议纪要 request",
            type: "object",
            properties: {
                subject: {
                    description: "会议纪要标题",
                    example: "'交互评审结论'",
                    type: "string"
                },
                content: {
                    description: "会议纪要内容",
                    example: "'砍需求'",
                    type: "string"
                }
            }
        },
        "6.1.1添加联系人Request": {
            title: "6.1.1 添加联系人 request",
            type: "object",
            properties: {
                mobile: {
                    description: "通过手机添加",
                    example: "13929561885",
                    type: "string"
                },
                email: {
                    description: "通过邮箱添加",
                    example: "luhui@cvte.com",
                    type: "string"
                }
            }
        },
        "7.1.1创建团队Request": {
            title: "7.1.1 创建团队 request",
            type: "object",
            properties: {
                name: {
                    description: "团队名称",
                    example: "1602-teams",
                    type: "string"
                }
            },
            required: ["name"]
        },
        ErrorInviteTeamMemberFail: {
            title: "ErrorInviteTeamMemberFail",
            example: {
                code: 4001001,
                message: "invite fail, mail not config",
                failUsers: [
                    {
                        email: "luhui@cvte.com"
                    }
                ]
            },
            type: "object",
            properties: {
                code: {
                    description: "错误码",
                    example: 4001001,
                    type: "number",
                    format: "double"
                },
                message: {
                    description: "错误内容",
                    example: "invite fail, mail not config",
                    type: "string"
                },
                failUsers: {
                    description: "",
                    type: "array",
                    items: {
                        $ref: "#/definitions/ErrorInviteTeamMemberFailUser"
                    }
                }
            }
        },
        "10.1.1创建重复会议Request": {
            title: "10.1.1 创建重复会议 request",
            type: "object",
            properties: {
                subject: {
                    description: "会议标题",
                    example: "交互评审",
                    type: "string"
                },
                content: {
                    description: "会议内容",
                    example: "teams 一期交互评审",
                    type: "string"
                },
                beginTime: {
                    description: "首次会议开始时间，unix时间戳，单位毫秒",
                    example: 1532920897000,
                    type: "number",
                    format: "double"
                },
                endTime: {
                    description: "首次会议结束时间，unix时间戳，单位毫秒",
                    example: 1532930897000,
                    type: "number",
                    format: "double"
                },
                address: {
                    description: "会议地点",
                    example: "科珠425",
                    type: "string"
                },
                roomId: {
                    description: "会议室 id",
                    example: "会议室 id",
                    type: "string"
                },
                members: {
                    $ref: "#/definitions/InviteMember"
                },
                repeatEndTime: {
                    description: "重复会议结束时时间，unix时间戳，单位毫秒",
                    example: 1532920897000,
                    type: "number",
                    format: "double"
                },
                repeatType: {
                    description: "重复类型，0为日，1为周",
                    example: 0,
                    type: "number",
                    format: "double"
                },
                repeatValue: {
                    description: "如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7",
                    example: 1,
                    type: "number",
                    format: "double"
                }
            },
            required: [
                "subject",
                "beginTime",
                "endTime",
                "address",
                "roomId",
                "repeatEndTime",
                "repeatType",
                "repeatValue"
            ]
        },
        "10.2.2修改重复会议信息Request": {
            title: "10.2.2 修改重复会议信息 request",
            type: "object",
            properties: {
                subject: {
                    description: "会议标题",
                    example: "交互评审",
                    type: "string"
                },
                content: {
                    description: "会议内容",
                    example: "teams 一期交互评审",
                    type: "string"
                },
                beginTime: {
                    description: "首次会议开始时间，unix时间戳，单位毫秒",
                    example: 1532920897000,
                    type: "number",
                    format: "double"
                },
                endTime: {
                    description: "首次会议结束时间，unix时间戳，单位毫秒",
                    example: 1532930897000,
                    type: "number",
                    format: "double"
                },
                address: {
                    description: "会议地点",
                    example: "科珠425",
                    type: "string"
                },
                roomId: {
                    description: "会议室 id",
                    example: "会议室 id",
                    type: "string"
                },
                repeatEndTime: {
                    description: "重复会议结束时时间，unix时间戳，单位毫秒",
                    example: 1532920897000,
                    type: "number",
                    format: "double"
                },
                repeatType: {
                    description: "重复类型，0为日，1为周",
                    example: 0,
                    type: "number",
                    format: "double"
                },
                repeatValue: {
                    description: "如果重复类型为日，则表示间隔的天数，至少间隔1天。如果重复类型为周，则表示重复的星期，值为1~7",
                    example: 1,
                    type: "number",
                    format: "double"
                }
            }
        }
    }
};
