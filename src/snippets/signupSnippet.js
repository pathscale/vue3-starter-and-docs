export const template = `
<template>
  <div>
    <form class="loginForm">
      <v-field label="Username">
        <v-input name="username" v-model="form.username.$value" placeholder="Enter username" />
        <p v-if="form.username.$dirty && form.username.$anyInvalid">
          <span v-for="error in form.username.$errors" :key="error" class="error">
            {{ error }}
            <br/>
          </span>
        </p>
      </v-field>
      <v-field label="Password">
        <v-input name="password" type="password" v-model="form.password.$value" placeholder="Enter password" />
        <p v-if="form.password.$dirty && form.password.$anyInvalid">
          <span v-for="error in form.password.$errors" :key="error" class="error">
            {{ error }}
            <br/>
          </span>
        </p>
      </v-field>
      <v-field label="Age">
        <v-input name="username" v-model="form.age.$value" placeholder="Enter age" />
        <p v-if="form.age.$dirty && form.age.$anyInvalid">
          <span v-for="error in form.age.$errors" :key="error" class="error">
            {{ error }}
            <br/>
          </span>
        </p>
      </v-field>
      <v-field>
        <v-button class="mt-4" type="is-uppercase" :disabled="!isValid">
          Sign up
        </v-button>
      </v-field>
    </form>
  </div>
</template>
`
export const script = `
<script>
import { defineComponent, ref, computed } from 'vue';
import { useValidation } from "vue-composable";
import { VInput, VField, VButton } from '@pathscale/vue3-ui';

export default defineComponent({
  name: 'Home',
  components: { VInput, VField, VButton, Snippet },
  setup () {
    const required = x => !!x;
    const form = useValidation({
      username: {
        $value: ref(""),
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
            return !/\\s/.test(v)
          },
          $message: "Username cannot contain whitespace"
        }
      },
      password: {
        $value: ref(""),
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
          $message: "Password must be longer than 8 characters"
        },
      },
      age: {
        $value: ref(""),
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
            return /[0-9]+/.test(v)
          },
          $message: "Age must only contain numbers"
        }
      }
    });
    const isValid = computed(() => {
      if(form.username.$anyInvalid || form.password.$anyInvalid || form.age.$anyInvalid) {
        return false
      } else {
        return true
      }
    })
    return { form, isValid }
  }
});
</script>`
