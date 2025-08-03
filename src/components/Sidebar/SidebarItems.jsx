import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import AdvancedSearch from "../Search/AdvancedSearch";

const SidebarItems = () => {
	return (
		<>
			<Home />
			<AdvancedSearch />
			<Notifications />
			<CreatePost />
			<ProfileLink />
		</>
	);
};

export default SidebarItems;
