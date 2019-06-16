/// <reference types="jest" />

import { List, Map } from 'immutable';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import { CharactersTools } from '../../engine/Characters/Character';
import { Direction, DirectionOctogone } from '../../engine/models/Direction';
import { IState } from '../../engine/reducers';
import { MapsTools } from './Maps';

describe('MapsTools', () => {

  // MapsTools.getCoordFromPosition
  // MapsTools.getRelativePosition

  const mockStore = configureStore();
  const character1 = CharactersTools.factory({ mat: 1 });
  const character2 = CharactersTools.factory({ mat: 2 });
  const character3 = CharactersTools.factory({ mat: 3 });

  // IMapsState = Map<string, List<Coord>>;
  const initialState = {
    Maps: Map({
      earth: List([
        {
          x: 0,
          y: 0,
          mat: 1,
        },
        {
          x: 1,
          y: 0,
          mat: 2,
        },
      ]),
    }),
  } as IState;

  let store: Store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('coords from character', () => {
    const expected = {
      key: 'earth',
      value: {
        mat: 1,
        x: 0,
        y: 0,
      },
    };
    const result = MapsTools.coordsFromCharacter(character1, store);
    expect(result).toEqual(expected);

    const expected2 = {
      key: 'earth',
      value: {
        mat: 2,
        x: 1,
        y: 0,
      },
    };
    const result2 = MapsTools.coordsFromCharacter(character2, store);
    expect(result2).toEqual(expected2);

    const resultNull = MapsTools.coordsFromCharacter(character3, store);
    expect(resultNull).toBeNull();
  });

  it('coords from position', () => {
    const expected = {
      mat: 1,
      x: 0,
      y: 0,
    };
    const result = MapsTools.getCoordFromPosition('earth', 0, 0, store);
    expect(result).toEqual(expected);

    const expected2 = {
      mat: 2,
      x: 1,
      y: 0,
    };
    const result2 = MapsTools.getCoordFromPosition('earth', 1, 0, store);
    expect(result2).toEqual(expected2);

    const resultNull = MapsTools.getCoordFromPosition('earth', 0, 5, store);
    expect(resultNull).toBeNull();
  });

  it('get relative position', () => {

    // X; // east-west position
    // Y; // north-south
    const expectedNorth = { x: 0, y: -1 };
    const expectedSouth = { x: 0, y: 1 };
    const expectedWest = { x: -1, y: 0 };
    const expectedEast = { x: 1, y: 0 };

    const resultNorth = MapsTools.getRelativePosition(0, 0, Direction.North);
    const resultNorthOcto = MapsTools.getRelativePosition(0, 0, DirectionOctogone.North);

    const resultSouth = MapsTools.getRelativePosition(0, 0, Direction.South);
    const resultSouthOcto = MapsTools.getRelativePosition(0, 0, DirectionOctogone.South);

    const resultWest = MapsTools.getRelativePosition(0, 0, Direction.West);
    const resultWestOcto = MapsTools.getRelativePosition(0, 0, DirectionOctogone.West);

    const resultEast = MapsTools.getRelativePosition(0, 0, Direction.East);
    const resultEastOcto = MapsTools.getRelativePosition(0, 0, DirectionOctogone.East);

    expect(resultNorth).toEqual(expectedNorth);
    expect(resultSouth).toEqual(expectedSouth);
    expect(resultWest).toEqual(expectedWest);
    expect(resultEast).toEqual(expectedEast);

    expect(resultNorthOcto).toEqual(expectedNorth);
    expect(resultSouthOcto).toEqual(expectedSouth);
    expect(resultWestOcto).toEqual(expectedWest);
    expect(resultEastOcto).toEqual(expectedEast);

  });

});
