import AbstractModel from '../Abstracts/model';

class BorderModel extends AbstractModel {
    constructor(borderSize) {
        super();

        this.properties = {
            borderSize: borderSize,
            borderSegments: {
                horizontalBorder: [false, false, false, false, false, false, false, false, false, false],
                verticalBorder: [false, false, false, false, false, false, false, false, false, false],
            },
        };
    }

    splitBorderIntoSegments(border) {
        const nearsideBorderPart = border.slice(0, 3);
        const middleBorderPart = border.slice(3, 7);
        const farsideBorderPart = border.slice(7);

        return [
            nearsideBorderPart,
            middleBorderPart,
            farsideBorderPart,
        ];
    }

    scaleSegmentsCenter(segment, newSegment) {
        let middleIndex;

        if (segment.length % 2 === 1) {
            middleIndex = Math.floor(segment.length / 2);
        } else {
            middleIndex = segment.length / 2 - 1;
        }

        const borderPointToScale = segment[middleIndex];
        const indexOfInsertion = Math.floor(newSegment.length / 2);

        newSegment.splice(indexOfInsertion, 0, borderPointToScale);

        return newSegment;
    }

    scaleBorder(border) {
        const separatedBorder = this.splitBorderIntoSegments(border);
        const nearsideBorderPart = separatedBorder[0];
        const middleBorderPart = separatedBorder[1];
        const farsideBorderPart = separatedBorder[2];
        const borderSize = this.get('borderSize');
        const tensNr = Math.floor((borderSize % 100) / 10);
        const unitsNr = borderSize % 10;
        const unitsLoopCount = Math.floor(unitsNr / 3);

        let newNearsideSegment = [...nearsideBorderPart];
        let newMiddleSegment = [...middleBorderPart];
        let newFarsideSegment = [...farsideBorderPart];

        const outputBorder = [newNearsideSegment, newMiddleSegment, newFarsideSegment];

        separatedBorder.forEach((borderSegment, indexA) => {
            for (let nr = tensNr; nr > 1; nr--) {
                borderSegment.forEach((borderPoint, indexB) => {
                    const indexOfInsertion = indexB * tensNr;
                    outputBorder[indexA].splice(indexOfInsertion, 0, borderPoint);
                });
            }
        });

        const multiplyAllCenters = () => {
            for (let nr = unitsLoopCount; nr > 0; nr--) {
                newNearsideSegment = this.scaleSegmentsCenter(nearsideBorderPart, newNearsideSegment);
                newMiddleSegment = this.scaleSegmentsCenter(middleBorderPart, newMiddleSegment);
                newFarsideSegment = this.scaleSegmentsCenter(farsideBorderPart, newFarsideSegment);
            }
        };

        switch (unitsNr % 3) {
            case 0 :
                multiplyAllCenters();
                break;
            case 1 :
                multiplyAllCenters();
                newMiddleSegment = this.scaleSegmentsCenter(middleBorderPart, newMiddleSegment);
                break;
            case 2 :
                multiplyAllCenters();
                newNearsideSegment = this.scaleSegmentsCenter(nearsideBorderPart, newNearsideSegment);
                newFarsideSegment = this.scaleSegmentsCenter(farsideBorderPart, newFarsideSegment);
                break;
            default:
                console.log(unitsNr);
        }

        return [].concat(...outputBorder);
    }

    updateBorders(borders, borderSize) {
        this.set('borderSize', borderSize);
        const horizontalBorder = this.scaleBorder(borders.horizontalBorder);
        const verticalBorder = this.scaleBorder(borders.verticalBorder);

        this.set('borderSegments', {horizontalBorder, verticalBorder});

    }

    static createBorderModel(borders, borderSize) {
        const borderModel = new BorderModel(borderSize);
        const horizontalBorder = borderModel.scaleBorder(borders.horizontalBorder);
        const verticalBorder = borderModel.scaleBorder(borders.verticalBorder);

        borderModel.set('borderSegments', {horizontalBorder, verticalBorder});

        return borderModel;
    }
}

export default BorderModel;
