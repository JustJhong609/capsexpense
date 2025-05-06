import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonAvatar,
    IonAlert,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    useIonAlert,
    IonButtons,
    IonBackButton,
    IonText
  } from '@ionic/react';
  import { useState, useRef } from 'react';
  import { chevronBack, camera, save, pencil, close } from 'ionicons/icons';
  import { useHistory } from 'react-router-dom';
  
  const Profile: React.FC = () => {
    const history = useHistory();
    const [present] = useIonAlert();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // User data state
    const [user, setUser] = useState({
      username: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      password: ''
    });
    
    const [editMode, setEditMode] = useState(false);
    const [tempPassword, setTempPassword] = useState('');
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [originalUser, setOriginalUser] = useState({ ...user });
  
    const handleInputChange = (field: keyof typeof user, value: string) => {
      setUser(prev => ({ ...prev, [field]: value }));
    };
  
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setUser(prev => ({ ...prev, avatar: event.target!.result as string }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
  
    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };
  
    const startEditing = () => {
      setOriginalUser({ ...user });
      setEditMode(true);
    };
  
    const cancelEditing = () => {
      setUser(originalUser);
      setEditMode(false);
    };
  
    const saveChanges = () => {
      if (user.username !== originalUser.username || 
          user.name !== originalUser.name || 
          user.email !== originalUser.email || 
          user.avatar !== originalUser.avatar) {
        setShowPasswordPrompt(true);
      } else {
        present('No changes were made', [{ text: 'OK' }]);
        setEditMode(false);
      }
    };
  
    const confirmPasswordAndSave = () => {
      if (tempPassword === 'password123') { // Replace with actual password verification
        present({
          header: 'Success',
          message: 'Profile updated successfully!',
          buttons: ['OK']
        });
        setEditMode(false);
        setTempPassword('');
        setShowPasswordPrompt(false);
      } else {
        present({
          header: 'Error',
          message: 'Incorrect password. Please try again.',
          buttons: ['OK']
        });
      }
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton 
                defaultHref="/" 
                icon={chevronBack}
                text=""
              />
            </IonButtons>
            <IonTitle>Profile</IonTitle>
            {editMode ? (
              <IonButtons slot="end">
                <IonButton onClick={cancelEditing}>
                  <IonIcon icon={close} slot="icon-only" />
                </IonButton>
                <IonButton onClick={saveChanges}>
                  <IonIcon icon={save} slot="icon-only" />
                </IonButton>
              </IonButtons>
            ) : (
              <IonButtons slot="end">
                <IonButton onClick={startEditing}>
                  <IonIcon icon={pencil} slot="icon-only" />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        
        <IonContent className="ion-padding">
          <div className="ion-text-center ion-margin-bottom">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              style={{ display: 'none' }}
              disabled={!editMode}
            />
            <IonAvatar 
              style={{ 
                width: '120px', 
                height: '120px', 
                margin: '0 auto 20px',
                cursor: editMode ? 'pointer' : 'default'
              }}
              onClick={editMode ? triggerFileInput : undefined}
            >
              <img src={user.avatar} alt="Profile" />
            </IonAvatar>
            {editMode && (
              <IonButton 
                fill="clear" 
                size="small"
                onClick={triggerFileInput}
              >
                <IonIcon icon={camera} slot="start" />
                Change Photo
              </IonButton>
            )}
          </div>
  
          <IonGrid>
            <IonRow>
              <IonCol>
                {editMode ? (
                  <IonInput
                    label="Username"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Enter username"
                    value={user.username}
                    onIonChange={e => handleInputChange('username', e.detail.value!)}
                    className="ion-margin-bottom"
                  />
                ) : (
                  <div className="profile-info-item">
                    <IonText color="medium">Username</IonText>
                    <IonText className="profile-info-value">{user.username}</IonText>
                  </div>
                )}
              </IonCol>
            </IonRow>
  
            <IonRow>
              <IonCol>
                {editMode ? (
                  <IonInput
                    label="Full Name"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Enter your full name"
                    value={user.name}
                    onIonChange={e => handleInputChange('name', e.detail.value!)}
                    className="ion-margin-bottom"
                  />
                ) : (
                  <div className="profile-info-item">
                    <IonText color="medium">Full Name</IonText>
                    <IonText className="profile-info-value">{user.name}</IonText>
                  </div>
                )}
              </IonCol>
            </IonRow>
  
            <IonRow>
              <IonCol>
                {editMode ? (
                  <IonInput
                    label="Email"
                    labelPlacement="floating"
                    fill="outline"
                    type="email"
                    placeholder="Enter your email"
                    value={user.email}
                    onIonChange={e => handleInputChange('email', e.detail.value!)}
                    className="ion-margin-bottom"
                  />
                ) : (
                  <div className="profile-info-item">
                    <IonText color="medium">Email</IonText>
                    <IonText className="profile-info-value">{user.email}</IonText>
                  </div>
                )}
              </IonCol>
            </IonRow>
  
            {editMode && (
              <IonRow>
                <IonCol>
                  <IonButton 
                    expand="block" 
                    onClick={saveChanges}
                    className="ion-margin-top"
                  >
                    Save Changes
                  </IonButton>
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
  
          {/* Password Confirmation Alert */}
          <IonAlert
            isOpen={showPasswordPrompt}
            onDidDismiss={() => setShowPasswordPrompt(false)}
            header={'Confirm Password'}
            message={'Please enter your password to save changes'}
            inputs={[
              {
                name: 'password',
                type: 'password',
                placeholder: 'Your password',
                attributes: {
                  required: true
                }
              }
            ]}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel'
              },
              {
                text: 'Confirm',
                handler: (data) => {
                  setTempPassword(data.password);
                  confirmPasswordAndSave();
                  return false;
                }
              }
            ]}
          />
        </IonContent>
  
        <style>{`
          .profile-info-item {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
          }
          .profile-info-value {
            font-size: 1rem;
            margin-top: 5px;
          }
        `}</style>
      </IonPage>
    );
  };
  
  export default Profile;