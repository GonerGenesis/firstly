---
title: Module - Auth
---

Auth is an important aspect of **most** applications. This module is here to help you with that.
It's using [lucia](https://lucia-auth.com/) package in the background and everything prepared to
just use it!

To use it, here is the idea, just tune to your needs:

```ts
import { firstly } from 'firstly/api'
import { auth } from 'firstly/auth'

// import { github } from 'firstly/auth/providers'

const Role = {
  ADMIN: 'admin'
}

export const remultApi = firstly({
  modules: [
    auth({
      providers: {
        // enable demo account (usefull for testing as there is no password!)
        demo: [
          // Few demo accounts
          { name: 'Noam' },
          { name: 'Ermin' },
          { name: 'JYC', roles: [Role.ADMIN] }
        ],

        // enable login / password
        password: {},

        // enable otp login
        otp: {
          send: async (data) => {
            console.info(`OTP to send`, JSON.stringify(data, null, 2))
          }
        },

        // enable oauth login
        oAuths: [
          // github example (we are waiting for you to add more providers / examples!)
          // github({
          //   authorizationURLOptions: { scopes: ['user:email'] },
          //   log: true,
          // }),
        ]
      }
    })
  ]
})
```

## lucia adapter

Under the hood, we created a lucia adapter, you can check the code
[here](https://github.com/jycouet/firstly/blob/main/packages/firstly/src/lib/auth/Adapter.ts). _Feel
free to copy/paste it in your own codebase._ You can also suggest improvements here 😉.

By default, all tables/fields will show up in your admin and you are able to extend then with your
own fields.
