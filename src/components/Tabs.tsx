import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet 
} from '@ionic/react';
import { 
  home as homeIcon, 
  addCircle as addIcon, 
  list as listIcon, 
  settings as settingsIcon 
} from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import AddExpense from '../pages/AddExpense';
import ExpensesList from '../pages/ExpensesList';
import Settings from '../pages/Settings';

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/app/add-expense">
          <AddExpense />
        </Route>
        <Route exact path="/app/expenses">
          <ExpensesList />
        </Route>
        <Route exact path="/app/settings">
          <Settings />
        </Route>
        <Route exact path="/app">
          <Redirect to="/app/dashboard" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/app/dashboard">
          <IonIcon icon={homeIcon} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="add" href="/app/add-expense">
          <IonIcon icon={addIcon} />
          <IonLabel>Add</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="expenses" href="/app/expenses">
          <IonIcon icon={listIcon} />
          <IonLabel>Expenses</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="settings" href="/app/settings">
          <IonIcon icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;