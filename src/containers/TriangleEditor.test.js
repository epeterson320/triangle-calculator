import { mapStateToProps, mapDispatchToProps } from './TriangleEditor';

describe('Triangle Editor', () => {
  describe('mapStateToProps', () => {
    it('Prints some hard-coded stuff for now', () => {
      expect(mapStateToProps()).toEqual({
        a: { x: 20, y: 100 },
        b: { x: 60, y: 30 },
        c: { x: 100, y: 100 },
        labels: {
          a: { x: 10, y: 108 },
          b: { x: 102, y: 108 },
          c: { x: 54, y: 26 },
          ab: { x: 54, y: 116 },
          ac: { x: 16, y: 68 },
          bc: { x: 84, y: 68 },
        },
      });
    });
  });

  describe('mapDispatchToProps', () => {
    it('Create a useless function for now', () => {
      expect(mapDispatchToProps().onClickTriangle).toBeDefined();
    });
  });
});
