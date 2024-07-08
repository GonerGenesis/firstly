/**
 *
 * ```ts
 * type KnownTypes = 'password' | 'otp' | 'oAuths' | 'demo'
 *
 * // literal or string
 * const knownType = litOrStr<KnownTypes>('demo')
 * const escapedType = litOrStr('coucou')
 *
 * // literal[] or string[]
 * const knownType = litOrStr<KnownTypes[]>(['demo', 'oAuths'])
 * const escapedType = litOrStr(['hello', 'coucou'])
 * ```
 */
export function litOrStr(value) {
    return value;
}
