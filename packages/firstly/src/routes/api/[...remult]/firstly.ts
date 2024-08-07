import { Entity, Fields } from 'remult'

import { firstly } from '$lib/api'
import { auth, KitAuthUser } from '$lib/auth'

// import { github } from '$lib/auth/providers'

const Role = {
  ADMIN: 'admin',
}

@Entity<_AppUser>('app_users', {
  dbName: 'app_users',
  // this overrides the default CRUD... So be carefull !
  // allowApiCrud: true,
  saving(e) {
    console.info(`Yop ${e.name} 👋`)
  },
})
export class _AppUser extends KitAuthUser {
  @Fields.string()
  jobTitle: string = 'CEO'
}

// const t: DynamicAuthorizationURLOptions<typeof oAuths> = { github: {} }

export const remultApi = firstly({
  modules: [
    {
      name: 'init',
      handlePreRemult: async (h) => {
        h.event.setHeaders({ 'x-remult': 'hello' })
        return await h.resolve(h.event)
      },
      earlyReturn: async () => {
        return {
          early: false,
        }
        // return h.resolve(h.event)
      },
    },
    auth({
      customEntities: {
        User: _AppUser,
      },

      // ui: {
      //   // paths: {
      //   //   // base: '',
      //   //   // login: '/login',
      //   // },
      //   // strings: {
      //   // }
      // },

      // signUp: false,

      verifiedMethod: 'email',

      // ui: {
      //   paths: {
      //     //
      //     base: '/kit',
      //     signin : "/signin"
      //   },
      //   password: {

      //   },
      //   btn_login: "Login"
      // },

      providers: {
        demo: [{ name: 'Noam' }, { name: 'Ermin' }, { name: 'JYC', roles: [Role.ADMIN] }],

        password: {
          // ui: {
          //   forgot: "oups"
          // }
          // resetPassword: async (url) => {
          //   console.info(`Mail to send with this url:`, url)
          //   console.info('You can use the function sendMail() from "firstly/mail"')
          // },
        },

        otp: {
          send: async (data) => {
            console.info(`OTP to send`, JSON.stringify(data, null, 2))
          },
        },

        oAuths: [
          // github({
          //   authorizationURLOptions: { scopes: ['user:email'] },
          //   log: true,
          // }),
        ],
      },
    }),
    {
      name: 'theEnd',
      handlePreRemult: async (h) => {
        return h.resolve(h.event)
      },
    },
  ],
})
