import { describe, it, expect, beforeEach } from "vitest"
import { useSnackbar } from "@/composables/useSnackbar"

describe("useSnackbar", () => {
  beforeEach(() => {
    // reset state before each test
    const snackbar = useSnackbar()

    snackbar.show.value = false
    snackbar.message.value = ""
    snackbar.color.value = "success"
    snackbar.title.value = ""
    snackbar.prependIcon.value = ""
  })

  it("should show success snackbar", () => {
    const snackbar = useSnackbar()

    snackbar.success("Saved successfully")

    expect(snackbar.show.value).toBe(true)
    expect(snackbar.message.value).toBe("Saved successfully")
    expect(snackbar.color.value).toBe("success")
    expect(snackbar.title.value).toBe("Success")
    expect(snackbar.prependIcon.value).toBe("$success")
  })

  it("should show error snackbar", () => {
    const snackbar = useSnackbar()

    snackbar.error("Something went wrong")

    expect(snackbar.show.value).toBe(true)
    expect(snackbar.message.value).toBe("Something went wrong")
    expect(snackbar.color.value).toBe("error")
    expect(snackbar.title.value).toBe("Error")
    expect(snackbar.prependIcon.value).toBe("$error")
  })

  it("should show info snackbar", () => {
    const snackbar = useSnackbar()

    snackbar.info("Information message")

    expect(snackbar.show.value).toBe(true)
    expect(snackbar.message.value).toBe("Information message")
    expect(snackbar.color.value).toBe("info")
    expect(snackbar.title.value).toBe("Info")
    expect(snackbar.prependIcon.value).toBe("$info")
  })

  it("should show warning snackbar", () => {
    const snackbar = useSnackbar()

    snackbar.warning("Warning message")

    expect(snackbar.show.value).toBe(true)
    expect(snackbar.message.value).toBe("Warning message")
    expect(snackbar.color.value).toBe("warning")
    expect(snackbar.title.value).toBe("Warning")
    expect(snackbar.prependIcon.value).toBe("$warning")
  })

  it("should allow custom title", () => {
    const snackbar = useSnackbar()

    snackbar.success("Saved", "Custom Success")

    expect(snackbar.title.value).toBe("Custom Success")
  })

  it("should share state across composable instances", () => {
    const snackbar1 = useSnackbar()
    const snackbar2 = useSnackbar()

    snackbar1.success("Shared state test")

    expect(snackbar2.show.value).toBe(true)
    expect(snackbar2.message.value).toBe("Shared state test")
  })
})