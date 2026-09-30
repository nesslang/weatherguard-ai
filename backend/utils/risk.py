def get_risk_level(bust_prob: float) -> str:
    if bust_prob < 0.30:
        return "LOW"
    elif bust_prob < 0.50:
        return "MODERATE"
    elif bust_prob < 0.70:
        return "HIGH"
    else:
        return "VERY HIGH"

def get_risk_color(risk_level: str) -> str:
    colors = {
        "LOW": "green",
        "MODERATE": "yellow",
        "HIGH": "orange",
        "VERY HIGH": "red"
    }
    return colors.get(risk_level, "gray")
