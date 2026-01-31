import * as React from 'react';

type ModalMode = 'create' | 'edit' | 'view' | null;

export function useAdminModal<TId = number>() {
  const [state, setState] = React.useState<{ mode: ModalMode; id: TId | null }>({
    mode: null,
    id: null,
  });

  const open = (mode: Exclude<ModalMode, null>, id: TId | null = null) => setState({ mode, id });
  const close = () => setState({ mode: null, id: null });

  return {
    ...state,
    isOpen: state.mode !== null,
    isCreate: state.mode === 'create',
    isEdit: state.mode === 'edit',
    isView: state.mode === 'view',
    open,
    close,
  };
}
