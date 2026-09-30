def get_confidence(bust_prob: float) -> float:
    return max(0.0, min(100.0, 100 * (1 - bust_prob)))

def get_confidence_level(confidence: float) -> str:
    if confidence >= 80:
        return "HIGH"
    elif confidence >= 60:
        return "MODERATE"
    elif confidence >= 40:
        return "LOW"
    else:
        return "VERY LOW"

def get_confidence_color(confidence: float) -> str:
    if confidence >= 80:
        return "GREEN"
    elif confidence >= 60:
        return "YELLOW"
    elif confidence >= 40:
        return "ORANGE"
    else:
        return "RED"
