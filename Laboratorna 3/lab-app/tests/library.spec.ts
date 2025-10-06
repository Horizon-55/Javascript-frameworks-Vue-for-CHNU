import { expect } from 'chai';
import { Library } from '../src/library';

// Виправлено тип id на number, щоб відповідати обмеженню Library<{ id: number }>
interface Item {
    id: number;
    name: string;
}
describe('Library', () => {
    it('add/getById/update/remove/find', () => {
        const lib = new Library<Item>([{ id: 1, name: 'A' }]);

        lib.add({ id: 2, name: 'B' });
        expect(lib.getAll()).to.have.length(2);

        expect(lib.getById(1)?.name).to.equal('A');

        lib.update(2, (cur) => ({ ...cur, name: 'B2' }));
        expect(lib.getById(2)?.name).to.equal('B2');

        const found = lib.find((i) => i.name.includes('B'));
        expect(found[0].id).to.equal(2);

        lib.remove(1);
        expect(lib.getById(1)).to.be.undefined;
    });
});
