import { describe, it, expect, beforeEach } from "vitest"
import { useConfirmDialog } from "@/composables/useConfirmDialog"

describe("useConfirmDialog", () => {
  beforeEach(() => {
    const dialog = useConfirmDialog()

    dialog.isOpen.value = false
    dialog.loading.value = false
    dialog.options.value = {}
  })

  it("should open dialog with provided options", async () => {
    const dialog = useConfirmDialog()

    dialog.confirm({
      title: "Delete Item",
      message: "Are you sure?",
      confirmText: "Yes",
      cancelText: "No",
      color: "error",
    })

    expect(dialog.isOpen.value).toBe(true)
    expect(dialog.options.value).toEqual({
      title: "Delete Item",
      message: "Are you sure?",
      confirmText: "Yes",
      cancelText: "No",
      color: "error",
    })
  })

  it("should resolve true when accept is called", async () => {
    const dialog = useConfirmDialog()

    const promise = dialog.confirm({
      title: "Confirm",
    })

    dialog.accept()

    await expect(promise).resolves.toBe(true)
  })

  it("should resolve false when cancel is called", async () => {
    const dialog = useConfirmDialog()

    const promise = dialog.confirm({
      title: "Confirm",
    })

    dialog.cancel()

    await expect(promise).resolves.toBe(false)
    expect(dialog.isOpen.value).toBe(false)
  })

  it("should set loading state", () => {
    const dialog = useConfirmDialog()

    dialog.setLoading(true)

    expect(dialog.loading.value).toBe(true)

    dialog.setLoading(false)

    expect(dialog.loading.value).toBe(false)
  })

  it("should share state across composable instances", async () => {
    const dialog1 = useConfirmDialog()
    const dialog2 = useConfirmDialog()

    dialog1.confirm({
      title: "Shared Dialog",
    })

    expect(dialog2.isOpen.value).toBe(true)
    expect(dialog2.options.value.title).toBe("Shared Dialog")
  })

  it("should overwrite options on multiple confirm calls", () => {
    const dialog = useConfirmDialog()

    dialog.confirm({
      title: "First",
    })

    dialog.confirm({
      title: "Second",
      message: "Updated message",
    })

    expect(dialog.options.value.title).toBe("Second")
    expect(dialog.options.value.message).toBe("Updated message")
  })
})