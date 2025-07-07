import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonTextarea
  } from '@ionic/react';
  import { categories } from '../data/categories'; 
  import React from 'react';
  
  interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (expense: Expense) => void;
  }
  
  interface Expense {
    amount: number;
    category: string;
    date: string;
    description: string;
  }
  
  const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose, onSave }) => {
    const [expense, setExpense] = React.useState<Expense>({
        amount: 0,
        category: '',
        date: new Date().toISOString(), 
        description: ''
    });
  
    const handleInputChange = (field: keyof Expense, value: any) => {
      setExpense(prev => ({
        ...prev,
        [field]: value
      }));
    };
  
    const handleSave = () => {
      onSave(expense);
      onClose();
    };
  
    return (
      <IonModal isOpen={isOpen} onDidDismiss={onClose}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add New Expense</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Amount</IonLabel>
            <IonInput
              type="number"
              value={expense.amount}
              onIonChange={e => handleInputChange('amount', parseFloat(e.detail.value!))}
              placeholder="0.00"
            ></IonInput>
          </IonItem>
  
          <IonItem>
            <IonLabel position="stacked">Category</IonLabel>
            <IonSelect
              value={expense.category}
              placeholder="Select Category"
              onIonChange={e => handleInputChange('category', e.detail.value)}
            >
              {categories.map(category => (
                <IonSelectOption key={category.id} value={category.id}>
                  {category.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
  
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime
              value={expense.date}
              onIonChange={e => handleInputChange('date', e.detail.value!)}
            ></IonDatetime>
          </IonItem>
  
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={expense.description}
              onIonChange={e => handleInputChange('description', e.detail.value!)}
              placeholder="Optional notes"
            ></IonTextarea>
          </IonItem>
  
          <IonButton expand="block" onClick={handleSave} className="ion-margin-top">
            Save Expense
          </IonButton>
        </IonContent>
      </IonModal>
    );
  };
  
  export default AddExpenseModal;