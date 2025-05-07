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
  useIonToast,
  IonButtons,
  IonBackButton,
  IonText
} from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import { chevronBack, camera, save, pencil, close } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import supabase from '../utils/supabaseClient';

const Profile: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // User data state
  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    password: ''
  });
  
  const [editMode, setEditMode] = useState(false);
  const [tempPassword, setTempPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [originalUser, setOriginalUser] = useState({ ...user });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        // Get user profile from public.users table
        const { data: profile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single();
        
        if (profile) {
          setUser({
            username: profile.username || authUser.email?.split('@')[0] || '',
            name: profile.name || '',
            email: authUser.email || '',
            avatar: profile.avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg',
            password: ''
          });
        }
      }
    };
    
    fetchUserData();
  }, []);

  const handleInputChange = (field: keyof typeof user, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Upload to Supabase Storage
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${authUser.id}/${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('user-avatars')
        .upload(filePath, file);

      if (uploadError) {
        present(uploadError.message, 3000);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-avatars')
        .getPublicUrl(filePath);

      // Update user avatar in state
      setUser(prev => ({ ...prev, avatar: publicUrl }));

      // Update profile in database
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl })
        .eq('id', authUser.id);

      if (updateError) {
        present(updateError.message, 3000);
      }
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
      present('No changes were made', 3000);
      setEditMode(false);
    }
  };

  const confirmPasswordAndSave = async () => {
    try {
      // Verify password
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: tempPassword
      });

      if (authError) throw authError;

      // Update user data in Supabase
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      const { error } = await supabase
        .from('users')
        .update({
          username: user.username,
          name: user.name,
          email: user.email
        })
        .eq('id', authUser.id);

      if (error) throw error;

      // Update auth email if changed
      if (user.email !== originalUser.email) {
        const { error: updateError } = await supabase.auth.updateUser({
          email: user.email
        });
        if (updateError) throw updateError;
      }

      present('Profile updated successfully!', 3000);
      setEditMode(false);
      setTempPassword('');
      setShowPasswordPrompt(false);
    } catch (error: any) {
      present(error.message || 'Failed to update profile', 3000);
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

        <IonGrid className="profile-grid">
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
                  className="profile-input"
                  clearOnEdit
                />
              ) : (
                <div className="profile-info-item">
                  <IonText color="medium" className="profile-label">Username</IonText>
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
                  className="profile-input"
                />
              ) : (
                <div className="profile-info-item">
                  <IonText color="medium" className="profile-label">Full Name</IonText>
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
                  className="profile-input"
                />
              ) : (
                <div className="profile-info-item">
                  <IonText color="medium" className="profile-label">Email</IonText>
                  <IonText className="profile-info-value">{user.email}</IonText>
                </div>
              )}
            </IonCol>
          </IonRow>

          {/* Additional Outline Input Example */}
          <IonRow>
            <IonCol>
              <IonInput
                label="Additional Info"
                labelPlacement="floating"
                fill="outline"
                placeholder="Enter additional information"
                className="profile-input"
                disabled={!editMode}
              />
            </IonCol>
          </IonRow>

          {editMode && (
            <IonRow>
              <IonCol>
                <IonButton 
                  expand="block" 
                  onClick={saveChanges}
                  className="save-button"
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
          margin-bottom: 24px;
        }
        .profile-label {
          font-size: 0.9rem;
          margin-bottom: 4px;
        }
        .profile-info-value {
          font-size: 1.1rem;
          font-weight: 500;
        }
        .profile-input {
          margin-bottom: 20px;
          --border-radius: 8px;
          --border-color: var(--ion-color-medium);
          --highlight-color-focused: var(--ion-color-primary);
        }
        .profile-grid {
          max-width: 600px;
          margin: 0 auto;
        }
        .save-button {
          margin-top: 16px;
          --border-radius: 8px;
          height: 48px;
          font-weight: 600;
        }
        ion-avatar {
          border: 2px solid var(--ion-color-light);
        }
      `}</style>
    </IonPage>
  );
};

export default Profile;