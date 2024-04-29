export function holiday_ifelse(day) {
    if (day === "土" || day === "日") {
        return true
    } else {
        return false
    }
}

export function holiday_switch(day) {
    switch (day) {
        case "土":
            return true
        case "日":
            return true
        default:
            return false
    }
}