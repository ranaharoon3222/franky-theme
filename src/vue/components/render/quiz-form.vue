<template>
  <div class="quiz-result">
    <div
      class="navigation-wrapper"
      :class="results.length > 0 ? 'results' : 'hide'"
    >
      <div ref="container" class="keen-slider">
        <div
          class="keen-slider__slide"
          v-for="dog in results"
          :key="dog.dogName"
        >
          <slot
            name="result"
            :postal_code_not_found="postal_code_not_found"
            :addToCart="addToCart"
            :dogs="dogs"
            :dog="dog"
            :loading="loading"
            :backToQuiz="backToQuiz"
            :alreadyCart="alreadyCart"
          ></slot>
        </div>
      </div>
      <svg
        v-if="results.length > 1"
        @click="slider.prev()"
        :class="{
          arrow: true,
          'arrow--left': true,
          'arrow--disabled': current === 0,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
        ></path>
      </svg>
      <svg
        v-if="slider && results.length > 1"
        @click="slider.next()"
        :class="{
          arrow: true,
          'arrow--right': true,
          'arrow--disabled':
            current === slider.track.details?.slides.length - 1,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path>
      </svg>

      <div v-if="slider && results.length > 1" class="dots">
        <button
          type="button"
          v-for="(_slide, idx) in dotHelper"
          @click="slider.moveToIdx(idx)"
          :class="{ dot: true, active: current === idx }"
          :key="idx"
        ></button>
      </div>
    </div>

    <FormKit
      type="form"
      @submit="onSubmit"
      #default="{ value }"
      :action="false"
      :actions="false"
    >
      <FormKit
        type="multi-step"
        :before-step-change="stepChange"
        tab-style="tab"
        :allow-incomplete="false"
      >
        <div class="step_content">
          <div class="step_inner">
            <slot
              :count="count"
              :rmDogs="rmDogs"
              :removeDog="removeDog"
              :dogs="dogs"
              :value="value['multi-step_2']"
            />

            <div class="button-flex" v-if="store.state.step.currentStep == 2">
              <button type="button" @click="addDog()" class="add-dog back btn">
                {{ $t('message.add_dog') }}
              </button>
              <button
                type="button"
                @click="removeDog()"
                class="add-dog back btn"
              >
                {{ $t('message.remove_dog') }}
              </button>
            </div>

            <FormKit
              type="step"
              name="customer"
              v-if="!customer && !tempCustomerId"
            >
              <password-field
                label="Password"
                name="password"
                validation="length:6,16|required"
              >
              </password-field>
            </FormKit>

            <FormKit type="step" name="review">
              <slot
                name="review"
                :value="value['multi-step_2']"
                :dogs="activeDogs"
              />

              <template #stepNext>
                <FormKit type="submit" />
              </template>
            </FormKit>
          </div>
        </div>
      </FormKit>
    </FormKit>
  </div>
</template>

<style>
.navigation-wrapper {
  position: relative;
}
.dots {
  display: flex !important;
  padding: 10px 0;
  justify-content: center;
}
.dot {
  border: none;
  width: 10px;
  height: 10px;
  background: #c5c5c5;
  border-radius: 50%;
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
}
.dot:focus {
  outline: none;
}
.dot.active {
  background: #000;
}
.arrow {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  fill: #fff;
  cursor: pointer;
}
.arrow--left {
  left: 5px;
}
.arrow--right {
  left: auto;
  right: 5px;
}
.arrow--disabled {
  fill: rgba(255, 255, 255, 0.5);
}
</style>

<script setup>
import { ref, computed, defineProps, inject } from 'vue';
import { useStore } from 'vuex';
import { formDataKibbles } from '../../kibbles-value';
import { coveredPostalCodes } from '../../post-codes';
import { useKeenSlider } from 'keen-slider/vue.es';
import 'keen-slider/keen-slider.min.css';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';
import PasswordField from './password-field.vue';

const MutationPlugin = (slider) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      slider.update();
    });
  });
  const config = { childList: true };

  slider.on('updated', () => {
    observer.observe(slider.container, config);
  });
  slider.on('destroyed', () => {
    observer.disconnect();
  });
};

const current = ref(1);
const [container, slider] = useKeenSlider(
  {
    initial: current.value,
    slideChanged: (s) => {
      current.value = s.track.details.rel;
    },
  },
  [MutationPlugin]
);

const dotHelper = computed(() => (slider.value ? [...results.value] : []));
const toast = useToast();

const props = defineProps(['customer']);
const config = inject(Symbol.for('FormKitConfig'));
const { t } = useI18n();

config.locale = Shopify.locale;

const loading = ref(false);
const count = ref(2);
const dogs = ref([1]);
const store = useStore();
const results = ref([]);
const alreadyCart = ref([]);
const cartProduct = ref('');
const postal_code_not_found = ref('');
const tempCustomerId = ref('');

const stepChange = (step) => {
  if (step.currentStep.isValid) {
    store.dispatch('step/next', step.targetStep.stepIndex + 1);
    count.value = step.targetStep.stepIndex;
  } else {
    if (step.delta < 0) {
      store.dispatch('step/next', step.targetStep.stepIndex + 1);
    }
  }
};

const dogCount = ref(1);
const rmDogs = ref([]);
const activeDogs = ref([1]);

const addDog = () => {
  dogCount.value = dogCount.value + 1;
  dogs.value.push(dogCount.value);
  activeDogs.value.push(dogCount.value);
};
const removeDog = (n) => {
  if (activeDogs.value.length > 1) {
    rmDogs.value.push(n);
    const filteredDog = activeDogs.value.filter((item) => item != n);
    activeDogs.value = filteredDog;
  }
};

// submission

const sendDataToMailChimp = (mailChimpData) => {
  fetch('https://for-franky.netlify.app/api/hello', {
    method: 'post',
    body: JSON.stringify(mailChimpData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetch('https://for-franky.netlify.app/api/ev', {
        method: 'post',
        body: JSON.stringify(mailChimpData),
      });
    });
};

const createCustomer = async ({
  name,
  email,
  postal_code,
  pass,
  allDogsData,
}) => {
  try {
    const customerData = JSON.stringify({
      name,
      email,
      postal_code,
      pass,
      dogsData: allDogsData,
    });

    const res = await fetch(
      'https://for-franky.netlify.app/api/create-customer',
      {
        method: 'POST',
        body: customerData,
      }
    );
    const customerResponse = await res.json();
    tempCustomerId.value = customerResponse.customer.id;
    console.log(customerResponse, 'customer res');
    toast.success(t('message.customer_created'), {
      timeout: 3048,
      hideProgressBar: false,
    });
  } catch (error) {
    console.log(error);
  }
};

async function updateCustomer(data) {
  try {
    const res = await fetch(
      'https://for-franky.netlify.app/api/update-customer',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );

    const customerResponse = await res.json();
    console.log(customerResponse, 'customer updated');
    toast.success(t('message.customer_updated'), {
      timeout: 3048,
      hideProgressBar: false,
    });
  } catch (error) {
    toast.error(t('message.global_error'), {
      timeout: 3048,
      hideProgressBar: false,
    });
    console.log(error);
  }
}

function calculateSampleSize(dailyAllowance) {
  return (
    (dailyAllowance / 5) * 1 +
    (dailyAllowance / 5) * 2 +
    (dailyAllowance / 5) * 3 +
    (dailyAllowance / 5) * 4 +
    (dailyAllowance / 5) * 5 +
    dailyAllowance * 9
  );
}

function getClosestSampleSize(value, sizes) {
  return sizes.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

function convertSizeToURLFormat(size) {
  return size.toString().replace('.', '-');
}

const addToCart = async ({ id, quantity, selling_plan, name }) => {
  loading.value = true;
  fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [
        {
          id,
          quantity,
          selling_plan,
        },
      ],
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('Cart:', data);
      alreadyCart.value.push({ name, product: data.items[0] });
      toast.success(
        t('message.add_to_cart', { msg: data.items[0].product_title }),
        {
          timeout: 3048,
          hideProgressBar: false,
        }
      );
      loading.value = false;
    })
    .catch((error) => {
      toast.error(t('message.global_error'), {
        timeout: 3048,
        hideProgressBar: false,
      });
      loading.value = false;
      console.error('Error:', error);
    });
};

// clear cart

const clearCart = async () => {
  try {
    await fetch(window.Shopify.routes.root + 'cart/clear');
    alreadyCart.value = [];
  } catch (error) {
    toast.error(t('message.global_error'), {
      timeout: 3048,
      hideProgressBar: false,
    });
  }
};

const backToQuiz = async () => {
  results.value = [];
  await clearCart();
};

// submission starts here

const onSubmit = async (val) => {
  postal_code_not_found.value = '';
  const data = val['multi-step_2'];
  const sizes = [1.5, 3, 4.5, 6];

  const fullName = data.information['full_name'];
  const postalCode = data.information.postal_code;
  const email = data.information.email;

  for (let i = 0; i < activeDogs.value.length; i++) {
    let age = data.age['dog_year_' + activeDogs.value[i]];
    let month = data.age['dog_month_' + activeDogs.value[i]];
    let activityLevel = Number(
      data.activity['dog_activity_' + activeDogs.value[i]]
    );
    let activityLabel =
      data.activity['dog_activity_' + activeDogs.value[i] + '_label'];
    let targetBodyConditionScore =
      Number(data.breed['breed_' + activeDogs.value[i] + '_label']) ===
      'greyhound'
        ? 4
        : 5;
    let bodyWeight = data.weight['dogweight_' + activeDogs.value[i]];
    let bodyConditionScore = Number(
      data.body_score['dog_score_' + activeDogs.value[i]]
    );
    let bodyScoreLabel =
      data.body_score['dog_score_' + activeDogs.value[i] + '_label'];
    let energy = Number(data.breed['breed_' + activeDogs.value[i]]);
    let desexed = Number(data.desexed['dog_desexed_' + activeDogs.value[i]]);
    let desexedLabel =
      data.desexed['dog_desexed_' + activeDogs.value[i] + '_label'];
    let dogName = data.dog_name['dog_' + activeDogs.value[i]];
    let dogImage = data.dog_name['dog_image' + activeDogs.value[i] + '_url'];
    let breedLabel = data.breed['breed_' + activeDogs.value[i] + '_label'];
    let breed = Number(data.breed['breed_' + activeDogs.value[i]]);
    let sex = Number(data.sex['dog_sex_' + activeDogs.value[i]]);
    let sexLabel = data.sex['dog_sex_' + activeDogs.value[i] + '_label'];
    let password = data?.customer?.password;

    const idealBodyWeight =
      (bodyWeight * 100) /
      (100 + (bodyConditionScore - targetBodyConditionScore) * 10);

    const metabolicBodyWeight = Math.pow(idealBodyWeight, 0.75);

    if (energy === 1) {
      if (age <= 2) {
        energy = 131;
      } else if (age >= 3 && age <= 7) {
        energy = 109;
      } else {
        energy = 95;
      }
    }

    const modifiedEnergyFactor = energy * ((activityLevel + desexed) / 2);

    const energyRequirement = metabolicBodyWeight * modifiedEnergyFactor;
    const mer = energyRequirement;

    const dailyAllowance = Math.trunc((100 * mer) / 358.5);
    const monthlyAllowance = Math.trunc(dailyAllowance * 30.4167);

    let currentFormData;
    let currentPlan;
    let currentVariantId;
    let currentQuantity;
    let maxQuantity = 12800;

    if (coveredPostalCodes.includes(postalCode.toString())) {
      for (let allowance = 3000; allowance <= 12800; allowance += 100) {
        let key = (allowance / 1000)?.toFixed(1).replace('.', '_') + 'Kg';

        cartProduct.value = (allowance / 1000)?.toFixed(1) + 'Kg';
        currentFormData = formDataKibbles[key];

        if (monthlyAllowance > 12800 && currentFormData) {
          cartProduct.value = '12_8Kg';
          currentFormData = formDataKibbles['12_8Kg'];

          currentPlan = currentFormData.items[0].selling_plan;
          currentVariantId = currentFormData.items[0].id;
          currentQuantity = currentFormData.items[0].quantity;
          break;
        } else if (monthlyAllowance <= allowance && currentFormData) {
          currentPlan = currentFormData.items[0].selling_plan;
          currentVariantId = currentFormData.items[0].id;
          currentQuantity = currentFormData.items[0].quantity;
          break;
        }
      }
    } else {
      toast.warning(t('message.nothing_added_cart'), {
        timeout: 3048,
        hideProgressBar: false,
      });
      postal_code_not_found.value = t('message.postal_code_not_found');
      console.log('nothing added to cart');
    }

    let sampleSizeLink;
    let closestSize;
    let adjustedPrice;
    let dailyPrice;
    let sampleId;

    for (let i = 3000; i <= 12800; i += 100) {
      if (monthlyAllowance > 12800) {
        const equationResult = calculateSampleSize(dailyAllowance) / 1000;
        closestSize = getClosestSampleSize(equationResult, sizes);
        sampleSizeLink = convertSizeToURLFormat(closestSize);
        adjustedPrice = ((12800 / 30.5) * 6.99 * 30.5) / 1000;
        dailyPrice = adjustedPrice / 30;

        sampleId = 46609155260758;
        break;
      } else if (monthlyAllowance <= i) {
        const equationResult = calculateSampleSize(dailyAllowance) / 1000;
        closestSize = getClosestSampleSize(equationResult, sizes);
        sampleSizeLink = convertSizeToURLFormat(closestSize);
        adjustedPrice = ((i / 30.5) * 6.99 * 30.5) / 1000;
        dailyPrice = adjustedPrice / 30;

        if (closestSize == 1.5) {
          sampleId = 46609147691350;
        } else if (closestSize == 3) {
          sampleId = 46609153556822;
        } else if (closestSize == 4.5) {
          sampleId = 46609154670934;
        } else if (closestSize == 6) {
          sampleId = 46609155260758;
        }
        break;
      }
    }

    const sameDogIndex = results.value.findIndex(
      (item) => item.dogName == dogName
    );

    if (sameDogIndex !== -1) {
      results.value.splice(sameDogIndex, 1);
    }

    const mailChimpData = {
      list_id: '19e84be598',
      skip_merge_validation: true,
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        CART: cartProduct.value,
        DAILYALL: dailyAllowance,
        MONTHLYALL: monthlyAllowance,
        FNAME: fullName,
        POSTALC: postalCode,
        DOGNAME: dogName,
        BREED: breedLabel,
        WEIGHT: bodyWeight,
        DOGAGE: age,
        DOGSEX: sexLabel,
        DOGAL: activityLabel,
        DESEXED: desexedLabel,
        BODYSCORE: bodyScoreLabel,
        IMAGE: dogImage,
        IMLINK: dogImage,
      },
    };

    // send data to mailchimp
    sendDataToMailChimp(mailChimpData);

    // update customer

    if (props.customer) {
      await updateCustomer({
        id: Number(props.customer),
        dogsData: mailChimpData.merge_fields,
      });
    } else if (tempCustomerId.value) {
      await updateCustomer({
        id: Number(tempCustomerId.value),
        dogsData: mailChimpData.merge_fields,
      });
    } else {
      await createCustomer({
        name: fullName,
        email,
        postal_code: postalCode,
        pass: password,
        allDogsData: mailChimpData.merge_fields,
      });
    }

    // end send data to mailchimp

    results.value.push({
      fullName,
      email,
      dogName,
      dogImage,
      breed,
      breedLabel,
      age,
      month,
      weight: bodyWeight,
      sex,
      sexLabel,
      activity: activityLevel,
      activityLabel,
      desexed,
      desexedLabel,
      bodyScore: bodyConditionScore,
      bodyScoreLabel,
      cart: {
        currentQuantity,
        currentVariantId,
        currentPlan,
        currentFormData,
        adjustedPrice,
        dailyPrice,
      },
      samples: {
        closestSize,
        sampleSizeLink,
        sampleId,
      },
      needs: { dailyAllowance, monthlyAllowance, idealBodyWeight },
    });
  }

  console.log(results.value);
  slider.value?.update();
};
</script>
