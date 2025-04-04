class TreeNode {
    private _value: number = 0;
    private visitCount: number = 0;
    private children: { [key: number]: TreeNode } = {};

    constructor() {}

    expanded(): boolean {
        return Object.keys(this.children).length > 0;
    }

    update(value: number): void {
        this._value += value;
        this.visitCount += 1;
    }

    public get value(): number {
        if (this.visitCount === 0) {
            return 0;
        } else {
            return this._value / this.visitCount;
        }
    }
}

let tree = new TreeNode();

console.log(tree);
tree.update(10);
tree.update(2);
console.log(tree.expanded());

console.log(tree.value);
