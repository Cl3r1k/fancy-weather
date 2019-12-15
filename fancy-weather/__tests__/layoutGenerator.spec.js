// const PaletteClass = require('../src/js/PaletteClass');
import layoutGenerator from '../src/js/layoutGenerator';

describe('#imageElement()', () => {
  test(`it should return 'instanceof HTMLImageElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.imageElement('img-class', 'path', 'description');

    // Assert
    expect(result instanceof HTMLImageElement).toEqual(true);
    expect(result.className).toEqual('img-class');
    expect(result.src).toEqual('http://localhost/path');
    expect(result.alt).toEqual('description');
  });
});

describe('#textElement()', () => {
  test(`it should return 'instanceof HTMLParagraphElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.textElement('text-class', 'Some text', 'idText');

    // Assert
    expect(result instanceof HTMLParagraphElement).toEqual(true);
    expect(result.className).toEqual('text-class');
    expect(result.textContent).toEqual('Some text');
    expect(result.id).toEqual('idText');
  });

  test(`it should correctly process multiple classes`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.textElement('text-class1 text-class2', 'Some text', 'idText');

    // Assert
    expect(result instanceof HTMLParagraphElement).toEqual(true);
    expect(result.className).toEqual('text-class1 text-class2');
    expect(result.textContent).toEqual('Some text');
    expect(result.id).toEqual('idText');
  });
});

describe('#h3TextElement()', () => {
  test(`it should return 'instanceof HTMLHeadingElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.h3TextElement('h3-class', 'Some h3 text', 'idH3Text');

    // Assert
    expect(result instanceof HTMLHeadingElement).toEqual(true);
    expect(result.className).toEqual('h3-class');
    expect(result.textContent).toEqual('Some h3 text');
    expect(result.id).toEqual('idH3Text');
  });

  test(`it should correctly process multiple classes`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.h3TextElement('h3-class1 h3-class2', 'Some h3 text', 'idText');

    // Assert
    expect(result instanceof HTMLHeadingElement).toEqual(true);
    expect(result.className).toEqual('h3-class1 h3-class2');
    expect(result.textContent).toEqual('Some h3 text');
    expect(result.id).toEqual('idText');
  });
});

describe('#inputElement()', () => {
  test(`it should return 'instanceof HTMLInputElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.inputElement('input-class', 'idInputText', 'text', '0', false, 'txt');

    // Assert
    expect(result instanceof HTMLInputElement).toEqual(true);
    expect(result.className).toEqual('input-class');
    expect(result.type).toEqual('text');
    expect(result.id).toEqual('idInputText');
    expect(result.value).toEqual('0');
    expect(result.checked).toEqual(false);
    expect(result.placeholder).toEqual('txt');
  });
});

describe('#checkboxStyledElement()', () => {
  test(`it should return 'instanceof HTMLDivElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.checkboxStyledElement();

    // Assert
    expect(result instanceof HTMLDivElement).toEqual(true);
  });
});

describe('#selectControlElement()', () => {
  test(`it should return 'instanceof HTMLSelectElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.selectControlElement();

    // Assert
    expect(result instanceof HTMLSelectElement).toEqual(true);
  });
});

describe('#buttonElement()', () => {
  test(`it should return 'instanceof HTMLButtonElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.buttonElement();

    // Assert
    expect(result instanceof HTMLButtonElement).toEqual(true);
  });
});

describe('#divElement()', () => {
  test(`it should return 'instanceof HTMLDivElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.divElement();

    // Assert
    expect(result instanceof HTMLDivElement).toEqual(true);
  });
});

describe('#controlsContainerElement()', () => {
  test(`it should return 'instanceof HTMLDivElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.controlsContainerElement();

    // Assert
    expect(result instanceof HTMLDivElement).toEqual(true);
  });
});

describe('#searchControlsElement()', () => {
  test(`it should return 'instanceof HTMLDivElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.searchControlsElement();

    // Assert
    expect(result instanceof HTMLDivElement).toEqual(true);
  });
});

describe('#weatherCardDetailedElement()', () => {
  test(`it should return 'instanceof HTMLElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.weatherCardDetailedElement();

    // Assert
    expect(result instanceof HTMLElement).toEqual(true);
  });
});

describe('#weatherTodayElement()', () => {
  test(`it should return 'instanceof HTMLDivElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.weatherTodayElement();

    // Assert
    expect(result instanceof HTMLDivElement).toEqual(true);
  });
});

describe('#weatherFutureElement()', () => {
  test(`it should return 'instanceof HTMLDivElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.weatherFutureElement();

    // Assert
    expect(result instanceof HTMLDivElement).toEqual(true);
  });
});

describe('#weatherContainerElement()', () => {
  test(`it should return 'instanceof HTMLDivElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.weatherContainerElement();

    // Assert
    expect(result instanceof HTMLDivElement).toEqual(true);
  });
});

describe('#mapWrapperElement()', () => {
  test(`it should return 'instanceof HTMLDivElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.mapWrapperElement();

    // Assert
    expect(result instanceof HTMLDivElement).toEqual(true);
  });
});

describe('#coordinatesBlockElement()', () => {
  test(`it should return 'instanceof HTMLDivElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.coordinatesBlockElement();

    // Assert
    expect(result instanceof HTMLDivElement).toEqual(true);
  });
});

describe('#searchContainerElement()', () => {
  test(`it should return 'instanceof HTMLDivElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.searchContainerElement();

    // Assert
    expect(result instanceof HTMLDivElement).toEqual(true);
  });
});

describe('#headerElement()', () => {
  test(`it should return 'instanceof HTMLElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.headerElement();

    // Assert
    expect(result instanceof HTMLElement).toEqual(true);
  });
});

describe('#mainElement()', () => {
  test(`it should return 'instanceof HTMLElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.mainElement();

    // Assert
    expect(result instanceof HTMLElement).toEqual(true);
  });
});

describe('#footerElement()', () => {
  test(`it should return 'instanceof HTMLElement' with given parameters`, () => {
    // Arrange

    // Act
    const result = layoutGenerator.footerElement();

    // Assert
    expect(result instanceof HTMLElement).toEqual(true);
  });
});

describe('#renderLayout()', () => {
  test(`it should render layout and able to find HTMLDivElement`, () => {
    // Arrange

    // Act
    layoutGenerator.renderLayout();

    // Assert
    expect(document.getElementById('idBGImage') instanceof HTMLDivElement).toEqual(true);
  });
});
