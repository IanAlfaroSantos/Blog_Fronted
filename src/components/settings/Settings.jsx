import { useUserSettings } from '../../shared/hooks';
import { UserSettings } from '../users/UpdateSettings'

export const Settings = () => {
    const { setUserSettings, isFetching, saveSettings } = useUserSettings();

    return (
        <div className="settings-container">
            <span>Settings</span>
            <UserSettings settings={ setUserSettings } saveSettings={ saveSettings }/>
        </div>
    )
}