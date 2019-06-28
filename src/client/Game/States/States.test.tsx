import React from 'react';
import renderer from 'react-test-renderer';
import { States } from '.';
import { characterDeadMat2, characterDefaultMat1, characterFullMat3 } from '../../../../test/mock/character';
import { Character } from '../../../engine/models';
import { refreshCharacters, setSelectedCharacter } from '../../actions';
import { Provider } from '../../provider';
import { createStore } from '../../store';
import { InfoBar, SimpleBar, DoubleBar, BarColors } from './Bar';

describe('UI States', () => {

  describe('States connected component', () => {

    const store = createStore();

    const def = characterDefaultMat1;
    const full: Character = characterFullMat3;
    const dead: Character = characterDeadMat2;

    store.dispatch(refreshCharacters({
      [def.mat]: characterDefaultMat1,
      [full.mat]: characterFullMat3,
      [dead.mat]: characterDeadMat2,
    }));

    it('Default character', () => {

      renderer.act(() => {
        store.dispatch(setSelectedCharacter(def.mat));
      });

      const component = renderer.create(
        (
          <Provider store={store}>
            <States />
          </Provider>
        ),
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('default character');
    });

    it('Dead character', () => {

      renderer.act(() => {
        store.dispatch(setSelectedCharacter(dead.mat));
      });

      const component = renderer.create(
        (
          <Provider store={store}>
            <States />
          </Provider>
        ),
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('dead character');
    });

    it('Full endurance character', () => {

      renderer.act(() => {
        store.dispatch(setSelectedCharacter(full.mat));
      });

      const component = renderer.create(
        (
          <Provider store={store}>
            <States />
          </Provider>
        ),
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('full character');
    });

    it('no character', () => {

      renderer.act(() => {
        store.dispatch(setSelectedCharacter(undefined));
      });

      const component = renderer.create(
        (
          <Provider store={store}>
            <States />
          </Provider>
        ),
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('no character');
    });
  });

  describe('InfoBar', () => {

    [undefined, false, true].forEach(inverted => {
      it(`should render with inverted = ${String(inverted)}`, () => {

        const component = renderer.create(
          (
            <InfoBar
              message={'message'}
              inverted={inverted}
            />
          ),
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot(`render inverted=${String(inverted)}`);
      });
    });
  });

  describe('SimpleBar', () => {

    [0, 1, 5].forEach(actual => {
      [undefined, 'message'].forEach(message => {
        [undefined, false, true].forEach(inverted => {
          it(`should render with actual = ${String(actual)}, message = ${String(message)}, inverted = ${String(inverted)}`, () => {

            const component = renderer.create(
              (
                <SimpleBar
                  actual={actual}
                  message={message}
                  inverted={inverted}
                />
              ),
            );

            const tree = component.toJSON();
            expect(tree).toMatchSnapshot(`render actual=${String(actual)},message=${String(message)},inverted=${String(inverted)}`);
          });
        });
      });
    });
  });

  describe('DoubleBar', () => {

    [80, 160, 200].forEach(actual => {
      [undefined, false, true].forEach(inverted => {
        [undefined, false, true].forEach(large => {
          it(`should render with actual = ${String(actual)}, inverted = ${String(inverted)}, large = ${String(large)}`, () => {

            const component = renderer.create(
              (
                <DoubleBar
                  actual={actual}
                  max={200}
                  inverted={inverted}
                  large={large}
                />
              ),
            );

            const tree = component.toJSON();
            expect(tree).toMatchSnapshot(`render actual=${String(actual)},inverted=${String(inverted)},large=${String(large)}`);
          });
        });
      });
    });
  });

  describe('DoubleBar Colors', () => {

    ['green', 'red', 'blue', 'yellow', 'gray', 'none'].forEach((backgroundColor: BarColors) => {
      ['green', 'red', 'blue', 'yellow', 'gray', 'none'].forEach((valueColor: BarColors) => {
        it(`should render with backgroundColor = ${backgroundColor}, valueColor = ${valueColor}`, () => {

          const component = renderer.create(
            (
              <DoubleBar
                actual={160}
                max={200}
                backgroundColor={backgroundColor}
                valueColor={valueColor}
              />
            ),
          );

          const tree = component.toJSON();
          expect(tree).toMatchSnapshot(`render backgroundColor=${backgroundColor},valueColor=${valueColor}`);
        });
      });
    });
  });

});