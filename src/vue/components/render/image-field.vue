<template>
  <FormKit
    accept=".jpg,.png"
    @input="fileHanlde"
    :type="type"
    :label="label"
    :name="name"
    :validation="validation"
  />
  <FormKit
    type="hidden"
    v-model="dogImage"
    :label="label"
    :name="name + '_url'"
    :validation="validation"
  />
  <div class="preview-image">
    <img :src="renderImage" />
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps(['label', 'name', 'validation', 'type']);
const renderImage = ref('');
const dogImage = ref('');

const toast = useToast();

async function reduce_image_file_size(
  base64Str,
  MAX_WIDTH = 1024,
  MAX_HEIGHT = 1024
) {
  let resized_base64 = await new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL()); // this will return base64 image results after resize
    };
  });
  return resized_base64;
}

async function image_to_base64(file) {
  let result_base64 = await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader.result);
    fileReader.onerror = (error) => {
      console.log(error);
      alert('An Error occurred please try again, File might be corrupt');
    };
    fileReader.readAsDataURL(file);
  });
  return result_base64;
}

async function process_image(file, min_image_size = 650) {
  const res = await image_to_base64(file);
  if (res) {
    const old_size = calc_image_size(res);
    if (old_size > min_image_size) {
      const resized = await reduce_image_file_size(res);
      const new_size = calc_image_size(resized);
      console.log('new_size=> ', new_size, 'KB');
      console.log('old_size=> ', old_size, 'KB');
      return resized;
    } else {
      console.log('image already small enough');
      return res;
    }
  } else {
    console.log('return err');
    return null;
  }
}

/*- NOTE: USE THIS JUST TO GET PROCESSED RESULTS -*/
async function preview_image(file) {
  // const file = document.querySelector('.dogFile');
  const image = await process_image(file);
  return image;
}

function calc_image_size(image) {
  let y = 1;
  if (image.endsWith('==')) {
    y = 2;
  }
  const x_size = image.length * (3 / 4) - y;
  return Math.round(x_size / 1024);
}

const fileHanlde = async (files) => {
  if (files[0]?.file) {
    const imgBase = await preview_image(files[0].file);
    var strImage = imgBase.replace(/^data:image\/[a-z]+;base64,/, '');
    renderImage.value = imgBase;
    await fetch('https://for-franky.netlify.app/api/file', {
      method: 'POST',
      body: JSON.stringify({
        name: files[0].name,
        imgData: strImage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dogImage.value = data.full_size_url;
      })
      .catch((e) => {
        toast.error(t('message.global_error'), {
          timeout: 3048,
          hideProgressBar: false,
        });
        console.log(e);
      });
  } else {
    dogImage.value = '';
    renderImage.value = '';
  }
};
</script>
