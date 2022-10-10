function assertIsNumber(value: unknown, name: string): asserts value is number {
    if (typeof value !== 'number') {
        throw Error(`Except ${name} to be a number`);
    }
}

function myRange(from: number, to: number): number[];
function myRange(from: unknown, to: unknown): number[] {
    assertIsNumber(from, 'from');
    assertIsNumber(to, 'to');

    const res: number[] = [];

    for (let i = from; i < to; i++) {
        res.push(i);
    }

    return res;
}

const res = myRange('c', 5);
console.log(res);