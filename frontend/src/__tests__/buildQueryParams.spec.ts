import { describe, it, expect } from "vitest"
import { buildQueryParams } from "@/utils/buildQueryParams"

describe("buildQueryParams", () => {
  it("should handle primitive values", () => {
    const params = buildQueryParams({
      name: "John",
      age: 30,
      active: true,
    })

    expect(params.toString()).toBe(
      "name=John&age=30&active=true"
    )
  })

  it("should ignore null and undefined values", () => {
    const params = buildQueryParams({
      name: "John",
      age: null,
      active: undefined,
    })

    expect(params.toString()).toBe("name=John")
  })

  it("should handle arrays as repeated keys", () => {
    const params = buildQueryParams({
      tags: ["vue", "vitest", "typescript"],
    })

    expect(params.getAll("tags")).toEqual([
      "vue",
      "vitest",
      "typescript",
    ])
  })

  it("should ignore null values inside arrays", () => {
    const params = buildQueryParams({
      tags: ["vue", null, "typescript"],
    })

    expect(params.getAll("tags")).toEqual([
      "vue",
      "typescript",
    ])
  })

  it("should flatten nested objects", () => {
    const params = buildQueryParams({
      user: {
        name: "John",
        age: 30,
      },
    })

    expect(params.toString()).toBe(
      "user.name=John&user.age=30"
    )
  })

  it("should flatten deeply nested objects", () => {
    const params = buildQueryParams({
      user: {
        profile: {
          email: "john@example.com",
        },
      },
    })

    expect(params.toString()).toBe(
      "user.profile.email=john%40example.com"
    )
  })

  it("should apply prefix correctly", () => {
    const params = buildQueryParams(
      {
        page: 1,
        limit: 10,
      },
      "filters"
    )

    expect(params.toString()).toBe(
      "filters.page=1&filters.limit=10"
    )
  })

  it("should handle mixed nested structures", () => {
    const params = buildQueryParams({
      user: {
        name: "John",
        roles: ["admin", "editor"],
      },
      active: true,
    })

    expect(params.get("user.name")).toBe("John")
    expect(params.getAll("user.roles")).toEqual([
      "admin",
      "editor",
    ])
    expect(params.get("active")).toBe("true")
  })

  it("should return empty params for empty object", () => {
    const params = buildQueryParams({})

    expect(params.toString()).toBe("")
  })
})