export const align = (f, isSlot) => {
    if (isSlot) {
        return 'text-center';
    }
    if (f?.inputType === 'number') {
        return 'text-right';
    }
    else if (f?.inputType === 'date' || f?.inputType === 'dateOnly') {
        return 'text-center';
    }
    return 'text-left';
};
export const getAligns = (cells, withAction) => {
    const cols = [...cells.map((c) => align(c.field, c.kind === 'slot'))];
    if (withAction) {
        cols.push('text-right');
    }
    return cols;
};
