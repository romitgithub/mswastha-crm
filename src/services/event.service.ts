class EventManager {
  private static instance: EventManager

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager()
    }

    return EventManager.instance
  }

  events: any = {}

  subscribe(eventName: string, callback: Function) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(callback)
  }

  dispatch(eventName: string, data: any) {
    if (this.events[eventName]) {
      for (const callback of this.events[eventName]) {
        callback(data)
      }
    }
  }
}

const EventService = EventManager.getInstance()

export default EventService
