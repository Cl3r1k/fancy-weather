// const PaletteClass = require('../src/js/PaletteClass');
import helper from '../src/js/helper';

describe('#getSeason()', () => {
  test(`it should return 'spring' for '1 Mar 2019 07:00:0 GMT'`, () => {
    // Arrange

    // Act
    const result = helper.getSeason(new Date('1 Mar 2019 07:00:0 GMT'));

    // Assert
    expect(result).toEqual('spring');
  });

  test(`it should return 'summer' for '1 Jun 2019 07:00:0 GMT'`, () => {
    // Arrange

    // Act
    const result = helper.getSeason(new Date('1 Jun 2019 07:00:0 GMT'));

    // Assert
    expect(result).toEqual('summer');
  });

  test(`it should return 'fall' for '1 Sep 2019 07:00:0 GMT'`, () => {
    // Arrange

    // Act
    const result = helper.getSeason(new Date('1 Sep 2019 07:00:0 GMT'));

    // Assert
    expect(result).toEqual('fall');
  });

  test(`it should return 'winter' for others values`, () => {
    // Arrange

    // Act
    const result = helper.getSeason('some day');

    // Assert
    expect(result).toEqual('winter');
  });
});

describe('#getDayPeriod()', () => {
  test(`it should return 'day' for '06:00 GMT+0001'`, () => {
    // Arrange
    const offsetSec = 60 * 60; // GMT+0001

    // Act
    const result = helper.getDayPeriod(new Date('1 Sep 2019 06:00:0 GMT'), offsetSec);

    // Assert
    expect(result).toEqual('day');
  });

  test(`it should return 'day' for '19:00 GMT+0001'`, () => {
    // Arrange
    const offsetSec = 60 * 60; // GMT+0001

    // Act
    const result = helper.getDayPeriod(new Date('1 Sep 2019 19:00:0 GMT'), offsetSec);

    // Assert
    expect(result).toEqual('night');
  });
});

describe('#convertCoordinatesToTime()', () => {
  test(`it should convert coordinates '55.75' to '55°45′'`, () => {
    // Arrange

    // Act
    const result = helper.convertCoordinatesToTime(55.75);

    // Assert
    expect(result).toEqual('55°45′');
  });
});
