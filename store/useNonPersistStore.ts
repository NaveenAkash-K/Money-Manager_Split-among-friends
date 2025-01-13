import {create} from 'zustand';

interface NonPersistStoreState {
    transactionDate: Date;
    setTransactionDate: (date: Date) => void;
}

const useNonPersistStore = create<NonPersistStoreState>()(
    //Properties
    (set, get) => ({
        transactionDate: new Date(),
        setTransactionDate: (date: Date) => set(() => ({transactionDate: date})),
    }),
)


export default useNonPersistStore;
