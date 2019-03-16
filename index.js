module.exports = {
	Bot : require('./src/Bot/Bot'),

	//Base
	Command         : require('./src/Bot/Base/Command'),
	TimedCommand    : require('./src/Bot/Base/TimedCommand'),
	Database        : require('./src/Bot/Base/Database'),
	Handler         : require('./src/Bot/Base/Handler'),
	ScheduledTask   : require('./src/Bot/Base/ScheduledTask'),
	ServiceProvider : require('./src/Bot/Base/ServiceProvider'),
	Event           : require('./src/Bot/Base/Event/Event'),
	EventDispatcher : require('./src/Bot/Base/Event/EventDispatcher'),
	EventListener   : require('./src/Bot/Base/Event/EventListener'),

	//Models
	StateModel : require('./src/Bot/Models/State'),

	//Helpers
	StateManager : require('./src/Bot/Helpers/StateManager'),

};