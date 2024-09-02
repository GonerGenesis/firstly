import { Fields, Relations, Validators, ValueListFieldType } from 'remult'

import { BaseEnum, FF_Entity, FF_Role } from '../..'
import type { BaseEnumOptions } from '../..'

export const FF_Role_Auth = {
  Admin: 'FF_Role_Auth.Admin',
} as const

@FF_Entity('ff_auth.users', {
  allowApiCrud: [FF_Role_Auth.Admin, FF_Role.Admin],
  caption: 'FF Auth - Users',
})
export class FFAuthUser {
  @Fields.cuid()
  id!: string

  @Fields.createdAt()
  createdAt!: Date

  @Fields.updatedAt()
  updatedAt?: Date

  @Fields.string<FFAuthUser>({
    validate: [
      Validators.unique(),
      Validators.required(),
      (e) => {
        if (e.identifier?.length < 2) throw 'Must be at least 2 characters long'
      },
    ],
  })
  identifier!: string

  @Fields.json<FFAuthUser, string[]>(() => [], {
    inputType: 'selectEnum',
    valueConverter: {
      toDb: (x) => (x ? x.join(',') : []),
      //FIXME: refacto this + remove "permissions" & add a disable user!
      fromDb: (x) => {
        return x
          ? x
              .split(',')
              .map((c: string) => c.replace('{', '').replace('}', ''))
              .filter((c: string) => c !== '')
          : []
      },
    },
  })
  roles: string[] = []

  @Relations.toMany<FFAuthUser, FFAuthAccount>(() => FFAuthAccount, 'userId')
  accounts!: FFAuthAccount[]

  @Relations.toMany<FFAuthUser, FFAuthUserSession>(() => FFAuthUserSession, 'userId')
  sessions!: FFAuthUserSession[]
}

@FF_Entity<FFAuthAccount>('ff_auth.accounts', {
  allowApiCrud: [FF_Role_Auth.Admin, FF_Role.Admin],
  caption: 'FF Auth - Accounts',
  // id: { provider: true, userId: true },
  changeLog: {
    excludeColumns: (e) => {
      return [e.hashPassword, e.token]
    },
  },
})
export class FFAuthAccount {
  @Fields.cuid()
  id!: string

  @Fields.createdAt()
  createdAt!: Date

  @Fields.updatedAt()
  updatedAt?: Date

  @Fields.string()
  userId!: string

  @Relations.toOne<FFAuthAccount, FFAuthUser>(() => FFAuthUser, 'userId')
  user!: FFAuthUser

  @Fields.string()
  provider = FFAuthProvider.PASSWORD.id

  @Fields.string()
  providerUserId = ''

  @Fields.string({ includeInApi: false, allowNull: true })
  hashPassword?: string

  @Fields.string({ includeInApi: false, allowNull: true })
  token?: string

  @Fields.date({ includeInApi: false, allowNull: true })
  expiresAt?: Date

  @Fields.date({ includeInApi: false, allowNull: true })
  lastVerifiedAt?: Date
}

@FF_Entity('ff_auth.users_sessions', {
  allowApiCrud: [FF_Role_Auth.Admin, FF_Role.Admin],
  caption: 'FF Auth - Users sessions',
  changeLog: false,
})
export class FFAuthUserSession {
  @Fields.cuid()
  id!: string

  @Fields.date()
  expiresAt!: Date

  @Fields.string()
  userId!: string

  @Relations.toOne<FFAuthUserSession, FFAuthUser>(() => FFAuthUser, 'userId')
  user!: FFAuthUser
}

@ValueListFieldType()
export class FFAuthProvider extends BaseEnum {
  static DEMO = new FFAuthProvider('DEMO', { caption: 'Demo' })
  static PASSWORD = new FFAuthProvider('PASSWORD', { caption: 'Password' })
  static OTP = new FFAuthProvider('OTP', { caption: 'TOTP' })
  static OAUTH = new FFAuthProvider('OAUTH', { caption: 'OAUTH' })

  constructor(id: string, o?: BaseEnumOptions) {
    super(id, {
      ...o,
    })
  }
}