import { ref } from "vue"

const show = ref(false)
const message = ref("")
const color = ref("success")
const title = ref("")
const prependIcon = ref("")

function open(options: {
  text: string
  type?: string
  title?: string
  icon?: string
}) {
  message.value = options.text
  color.value = options.type ?? "success"
  title.value = options.title ?? ""
  prependIcon.value = options.icon ?? ""
  show.value = true
}

export function useSnackbar() {
  return {
    show,
    message,
    color,
    title,
    prependIcon,

    success(text: string, customTitle = "Success") {
      open({
        text,
        type: "success",
        title: customTitle,
        icon: "$success",
      })
    },

    error(text: string, customTitle = "Error") {
      open({
        text,
        type: "error",
        title: customTitle,
        icon: "$error",
      })
    },

    info(text: string, customTitle = "Info") {
      open({
        text,
        type: "info",
        title: customTitle,
        icon: "$info",
      })
    },

    warning(text: string, customTitle = "Warning") {
      open({
        text,
        type: "warning",
        title: customTitle,
        icon: "$warning",
      })
    }
  }
}