export const MAX_LENGTH_PASSWORD = 8;
                // EMAIL
                            // ([^@\s]+): Matches one or more characters that are not "@" 
                                                //or whitespace, representing the local part of the email address
                            // @: Matches the "@" symbol
                            // (abv\.bg|domain\.com): Matches either "abv.bg" or "domain.com", 
                                                        //representing the domain part of the email address
export const EMAIL_PATERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // PASSWORD
                                // At least one upper case English letter, (?=.*?[A-Z])
                                // At least one lower case English letter, (?=.*?[a-z])
                                // At least one digit, (?=.*?[0-9])
                                // At least one special character, (?=.*?[#?!@$%^&*-])
                                // Minimum eight in length .{8,} (with the anchors)
export const PASSWORD_PATERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const URL_PATTERN =/^https?:\/\//i;