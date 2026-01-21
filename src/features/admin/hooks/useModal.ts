import * as React from 'react';

type Mode = 'create' | 'edit' | 'view' | 'delete' | null;

type ModalState =
  | { mode: null; id: null }
  | { mode: 'create'; id: null }
  | { mode: 'edit' | 'view' | 'delete'; id: number };

export function useModal() {
  const [state, setState] = React.useState<ModalState>({
    mode: null,
    id: null,
  });

  return {
    // state
    mode: state.mode,
    id: state.id,
    isOpen: state.mode !== null,
    isCreate: state.mode === 'create',
    isEdit: state.mode === 'edit',
    isView: state.mode === 'view',
    isDelete: state.mode === 'delete',

    // actions
    openCreate: () => setState({ mode: 'create', id: null }),
    openEdit: (id: number) => setState({ mode: 'edit', id }),
    openView: (id: number) => setState({ mode: 'view', id }),
    openDelete: (id: number) => setState({ mode: 'delete', id }),
    close: () => setState({ mode: null, id: null }),
  };
}
