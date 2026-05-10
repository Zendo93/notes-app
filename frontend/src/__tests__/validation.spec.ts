import { describe, it, expect } from "vitest"
import { required, maxLength } from "@/utils/validation"

describe("validation utils", () => {
  describe("required", () => {
    it("should return true for valid string", () => {
      expect(required("hello")).toBe(true)
    })

    it("should return true for trimmed non-empty string", () => {
      expect(required("  hello  ")).toBe(true)
    })

    it("should return error message for empty string", () => {
      expect(required("")).toBe("Field is required")
    })

    it("should return error message for whitespace string", () => {
      expect(required("   ")).toBe("Field is required")
    })

    it("should return error message for null", () => {
      expect(required(null)).toBe("Field is required")
    })

    it("should return error message for undefined", () => {
      expect(required(undefined)).toBe("Field is required")
    })

    it("should return error message for false", () => {
      expect(required(false)).toBe("Field is required")
    })

    it("should return error message for number 0", () => {
      expect(required(0)).toBe("Field is required")
    })

    it("should return true for positive numbers", () => {
      expect(required(123)).toBe(true)
    })
  })

  describe("maxLength", () => {
    it("should return true when value is shorter than max", () => {
      const rule = maxLength(10)

      expect(rule("hello")).toBe(true)
    })

    it("should return true when value equals max length", () => {
      const rule = maxLength(5)

      expect(rule("hello")).toBe(true)
    })

    it("should return error message when value exceeds max length", () => {
      const rule = maxLength(5)

      expect(rule("hello world")).toBe("Max 5 characters")
    })

    it("should return true for empty string", () => {
      const rule = maxLength(5)

      expect(rule("")).toBe(true)
    })

    it("should return true for null", () => {
      const rule = maxLength(5)

      expect(rule(null)).toBe(true)
    })

    it("should return true for undefined", () => {
      const rule = maxLength(5)

      expect(rule(undefined)).toBe(true)
    })

    it("should work with numbers", () => {
      const rule = maxLength(3)

      expect(rule(123)).toBe(true)
      expect(rule(1234)).toBe("Max 3 characters")
    })
  })
})