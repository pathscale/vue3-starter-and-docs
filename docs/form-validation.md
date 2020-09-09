
Places where we need validation:
Login form:
- username: 
  - text validation
  - required field ("Username field is required")
- password: 
  - text validation
  - required field ("Password field is required")
  ``` js
	// login form validation snippet
	const form = useValidation({
	  username: {
	    $value: username,
	    required: {
	      $validator: required,
	      $message: ref("Username field is required")
	    }
	  },
	  password: {
	    $value: password,
	    required: {
	      $validator: required,
	      $message: ref("Password field is required")
	    }
      },
   });
  ```
Signup form:
- username: 
  - text validation
  - required field ("Username field is required")
  - max 32 characters ("Username cannot be longer than 32 characters")
  - min 2 characters ("Username must be at least 2 characters")
  - cannot contain whitespace("Username cannot contain whitespace") `/\s/.test(username)`
- password:
  - text validation
  - required field ("Password field is required")
  - max 128 characters ("Password cannot be longer than 128 characters")
  - min 8 characters ("Password must be longer than 8 characters")
- nickname:
  - text validation
  - min 2 characters ("Nickname must be at least 2 characters")
  - max 32 characters("Nickname cannot be longer than 32 characters")
  - required field ("Nickname field is required")
- age:
  - number validation ("Age must only contain numbers")
  - required field ("Age field is required")
  - min 1 ("Age must be higher than 1")
  - max 4 characters ("Age must be lower than 4 characters")
   ``` js
	// signup form validation snippet
	const form = useValidation({
	  username: {
	    $value: username,
	    required: {
	      $validator: required,
	      $message: ref("Username field is required")
	    },
	    maximumLength: {
	      $validator(v) {
	        return v.length <= 32;
	      },
	      $message: "Username cannot be longer than 32 characters"
	    },
	    minimumLength: {
	      $validator(v) {
	        return v.length >= 2;
	      },
	      $message: "Username must be longer than 2 characters"
	    },
	    noSpaces: {
	      $validator(v) {
	        return !/\s/.test(v)
	      },
	      $message: "Username cannot contain whitespace"
	    }
	  },
	  password: {
	    $value: password,
	    required: {
	      $validator: required,
	      $message: ref("Password field is required")
	    },
	    maximumLength: {
	      $validator(v) {
	        return v.length <= 128;
	      },
	      $message: "Password cannot be longer than 128 characters"
	    },
	    minimumLength: {
	      $validator(v) {
	        return v.length >= 8;
	      },
	      $message: "Passwordmust be longer than 8 characters"
	    },
	  },
	  nickname: {
	    $value: nickname,
	    required: {
	      $validator: required,
	      $message: ref("Nickname field is required")
	    },
	    maximumLength: {
	      $validator(v) {
	        return v.length <= 32;
	      },
	      $message: "Nickname cannot be longer than 32 characters"
	    },
	    minimumLength: {
	      $validator(v) {
	        return v.length >= 2;
	      },
	      $message: "Nickname must be longer than 2 characters"
	    }
	  },
	  age: {
	    $value: age,
	    required: {
	      $validator: required,
	      $message: ref("Age field is required")
	    },
	    minimumValue: {
	      $validator(v) {
	        return parseInt(v) > 1;
	      },
	      $message: "Age must be higher than 1"
	    },
	    maximumLength: {
	      $validator(v) {
	        return v.length < 4;
	      },
	      $message: "Age must be lower than 4 characters"
	    },
	    isNumber: {
	      $validator(v) {
	        return v.matches("[0-9]+")
	      },
	      $message: "Age must only contain numbers"
	    }
      }
   });
  ```
  
Settings page:
- email: 
  - text validation
  - must be valid email format ("Email must be valid)
  ```js
  // regex for email validation
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  re.test(email)
  ```
- minimal friend karma: 
  - number validation ("Minimal friend karma must be a number")
  - length ("The Minimal Friend Karma must between 0 ~ 999999")

Dependencies:
- [vue-composable Validation](https://pikax.me/vue-composable/composable/validation/validation.html "Validation | vue-composable")