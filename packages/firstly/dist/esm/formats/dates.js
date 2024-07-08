import { logFirstly } from '../';
export const dateISOToPlainDate = (iso) => {
    try {
        // const ti = Temporal.Instant.from(iso)
        // return ti.toZonedDateTimeISO('UTC').toPlainDate()
        if (iso.includes('T')) {
            return iso.split('T')[0];
        }
    }
    catch (error) { }
    const msg = `fn dateISOToPlainDate -> "${iso}" is not valid iso`;
    logFirstly.error(msg);
    throw new Error(msg);
};
export const offsetedToPlainDate = (dt) => {
    const userTimezoneOffset = dt.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(dt.getTime() - userTimezoneOffset);
    return adjustedDate.toISOString().split('T')[0];
    // Huge performance issue! (check: filterAndRowSpan)
    // const ti = Temporal.Instant.from(adjustedDate.toISOString())
    // return ti.toZonedDateTimeISO('UTC').toPlainDate()
};
/**
 * in `range`, `from` is inclusive and `to` is exclusive
 */
export const isBetween = (dt, range) => {
    return plainDateCompare(dt, { $gte: range.from, $lt: range.to });
};
export const plainDateCompare = (dt, op) => {
    const gt = op.$gt ? new Date(op.$gt) < new Date(dt) : true;
    const gte = op.$gte ? new Date(op.$gte) <= new Date(dt) : true;
    const lt = op.$lt ? new Date(dt) < new Date(op.$lt) : true;
    const lte = op.$lte ? new Date(dt) <= new Date(op.$lte) : true;
    return gt && gte && lt && lte;
};
