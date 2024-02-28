import { useState, useEffect, useCallback, useMemo } from 'react';
import { fabric } from 'fabric';
import { debounce } from 'lodash';

type UseCanvasStateProps = {
  canvas: fabric.Canvas | null;
  flag: any;
};

const useCanvasState = ({ canvas, flag }: UseCanvasStateProps) => {
  const [state, setState] = useState<string[]>([]);
  const [currentStateIndex, setCurrentStateIndex] = useState<number>(-1);

  const updateCurrentState = useCallback((newState: string) => {
    setState(prevState => {
      const index = prevState.length;
      const newStates = [...prevState, newState];
      setCurrentStateIndex(index);
      return newStates;
    });
  }, []);

  const debouncedUpdateCurrentState = useCallback(
    debounce((newState: string) => {
      setState((prevState) => {
        // Check if the new state is the same as the last state in the stack
        if (prevState.length > 0 && prevState[prevState.length - 1] === newState) {
          return prevState;
        }

        const index = prevState.length;
        const newStates = [...prevState, newState];
        setCurrentStateIndex(index);
        return newStates;
      });
    }, 300), []);





  useEffect(() => {
    if (canvas) {
      canvas.on('object:added', () => {
        if (canvas.backgroundImage)
          debouncedUpdateCurrentState(JSON.stringify(canvas.toJSON()));
      });
      canvas.on('object:modified', () => {
        if (canvas.backgroundImage)
          debouncedUpdateCurrentState(JSON.stringify(canvas.toJSON()));
      });
    }
  }, [canvas, debouncedUpdateCurrentState]);

  const undo = useCallback(() => {
    if (canvas && currentStateIndex > 0) {
      canvas.loadFromJSON(state[currentStateIndex - 1], () => {
        canvas.renderAll();
        setCurrentStateIndex(prevIndex => prevIndex - 1);
      });
    }
  }, [canvas, currentStateIndex, state]);

  const redo = useCallback(() => {
    if (canvas && currentStateIndex < state.length - 1) {
      canvas.loadFromJSON(state[currentStateIndex + 1], () => {
        canvas.renderAll();
        setCurrentStateIndex(prevIndex => prevIndex + 1);
      });
    }
  }, [canvas, currentStateIndex, state]);

  const isUndoEnabled = useMemo(() => currentStateIndex > 0, [currentStateIndex]);
  const isRedoEnabled = useMemo(() => currentStateIndex < state.length - 1, [currentStateIndex, state]);

  return useMemo(() => ({ isUndoEnabled, isRedoEnabled, undo, redo }), [isUndoEnabled, isRedoEnabled, undo, redo]);

};


export default useCanvasState;
