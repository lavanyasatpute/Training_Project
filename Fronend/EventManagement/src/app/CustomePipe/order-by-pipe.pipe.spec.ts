import { OrderBy } from './order-by-pipe.pipe';

describe('OrderByPipePipe', () => {
  it('create an instance', () => {
    const pipe = new OrderBy();
    expect(pipe).toBeTruthy();
  });
});
