import { expect } from 'chai';
import { Validation } from '../src/validation';

describe('Validation', () => {
  it('required', () => {
    expect(Validation.required('')).to.equal(false);
    expect(Validation.required('abc')).to.equal(true);
  });

  it('year', () => {
    const current = new Date().getFullYear();
    expect(Validation.year('')).to.deep.equal({ valid: true });
    expect(Validation.year('1399').valid).to.equal(false);
    expect(Validation.year(String(current + 1)).valid).to.equal(false);
    expect(Validation.year('2008').valid).to.equal(true);
  });

  it('email', () => {
    expect(Validation.email('user@example.com')).to.equal(true);
    expect(Validation.email('bad@')).to.equal(false);
  });
});
