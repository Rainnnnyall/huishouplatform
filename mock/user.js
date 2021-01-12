
//后台给前台返回的tocken信息
const tokens = {
  admin: {
    token: 'admin-token'
  },
  recyclrer: {
    token: 'recyclrer-token'
  },
  user: {
    token: 'user-token'
  }
}

//用户登录后给前台返回的用户信息
const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'admin'
  },
  'recyclrer-token': {
    roles: ['recyclrer'],
    introduction: 'I am an recyclrer',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'recyclrer'
  },
  'user-token': {
    roles: ['user'],
    introduction: 'I am an user',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'user'
  }
}

export default [
  // 用户登录接口
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '用户名密码输入不正确！'
        }
      }
      return {
        code: 20000,
        data: token
      }
    }
  },

  // 获取用户信息接口
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // 用户退出登录接口
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
