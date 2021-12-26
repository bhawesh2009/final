class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      console.log(message);
      const lowercase = message.toLowerCase();
  
      if (lowercase.includes("hello") || lowercase.includes("hey")) {
        this.actionProvider.greet();
      }
      if (lowercase.includes("Rajsthani") || lowercase.includes("Rajsthani")) {
        this.actionProvider.Clothing();
      }
      if (lowercase.includes("Gujrati") || lowercase.includes("Tiffin")) {
        this.actionProvider.Accessories();
      }
      if (lowercase.includes("others") || lowercase.includes("other")) {
        this.actionProvider.Other();
      }
    }
  }
  
  export default MessageParser;