import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BikeDiagram } from "../BikeDiagram";
import {
  BikeComponentArea,
  SelectedComponent,
  CompatibilityResult,
} from "@/types";

// Mock the debounce hooks
jest.mock("@/hooks/useDebounce", () => ({
  useHoverDebounce: jest.fn(() => ({
    handleMouseEnter: jest.fn(),
    handleMouseLeave: jest.fn(),
    cleanup: jest.fn(),
    currentHovered: null,
  })),
  useDebounce: jest.fn((callback) => [callback, jest.fn(), false]),
  useAnimationState: jest.fn(() => ({
    requestAnimationFrame: jest.fn((callback) => callback()),
    cancelAnimation: jest.fn(),
    isAnimating: false,
  })),
}));

describe("BikeDiagram Animation System", () => {
  const mockOnComponentClick = jest.fn();
  const mockSelectedComponents: SelectedComponent[] = [];
  const mockCompatibilityResults: CompatibilityResult[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders bike diagram with performance-optimized classes", () => {
    render(
      <BikeDiagram
        selectedComponents={mockSelectedComponents}
        onComponentClick={mockOnComponentClick}
        compatibilityResults={mockCompatibilityResults}
      />
    );

    // Check if the main container has cyberpunk styling
    const diagramContainer = screen.getByRole("img", {
      name: /interactive bike diagram/i,
    });
    expect(diagramContainer).toBeInTheDocument();
  });

  it("applies GPU-accelerated classes to interactive areas", () => {
    render(
      <BikeDiagram
        selectedComponents={mockSelectedComponents}
        onComponentClick={mockOnComponentClick}
        compatibilityResults={mockCompatibilityResults}
      />
    );

    // Check for clickable areas with performance classes
    const clickableAreas = screen.getAllByRole("button");
    expect(clickableAreas.length).toBeGreaterThan(0);

    clickableAreas.forEach((area) => {
      expect(area).toHaveClass("cyberpunk-gpu-accelerated");
      expect(area).toHaveClass("cyberpunk-transition-gpu-fast");
    });
  });

  it("handles click interactions with debouncing", async () => {
    render(
      <BikeDiagram
        selectedComponents={mockSelectedComponents}
        onComponentClick={mockOnComponentClick}
        compatibilityResults={mockCompatibilityResults}
      />
    );

    const firstArea = screen.getAllByRole("button")[0];

    // Click the area
    fireEvent.click(firstArea);

    // Verify the click handler was called
    await waitFor(() => {
      expect(mockOnComponentClick).toHaveBeenCalled();
    });
  });

  it("applies correct animation classes for selected components", () => {
    const selectedComponents: SelectedComponent[] = [
      {
        area: {
          id: "bottom-bracket",
          name: "Bottom Bracket",
          coordinates: { x: 330, y: 240, width: 45, height: 45 },
          category: "bottom_bracket" as any,
          isSelected: true,
        },
        component: {
          id: 1,
          name: "Test Component",
          brand: "Test Brand",
          category: "bottom_bracket" as any,
          compatibility_data: {},
        },
      },
    ];

    render(
      <BikeDiagram
        selectedComponents={selectedComponents}
        onComponentClick={mockOnComponentClick}
        compatibilityResults={mockCompatibilityResults}
      />
    );

    const selectedArea = screen.getByRole("button", {
      name: /bottom bracket.*currently selected/i,
    });

    expect(selectedArea).toHaveClass("bike-area-selected-enhanced");
    expect(selectedArea).toHaveClass("cyberpunk-glow-selected");
  });

  it("supports keyboard navigation with enhanced focus states", () => {
    render(
      <BikeDiagram
        selectedComponents={mockSelectedComponents}
        onComponentClick={mockOnComponentClick}
        compatibilityResults={mockCompatibilityResults}
      />
    );

    const firstArea = screen.getAllByRole("button")[0];

    // Focus the area
    firstArea.focus();
    expect(firstArea).toHaveClass("cyberpunk-focus-enhanced");

    // Test keyboard interaction
    fireEvent.keyDown(firstArea, { key: "Enter" });
    expect(mockOnComponentClick).toHaveBeenCalled();
  });

  it("applies compatibility-based animation classes", () => {
    const compatibilityResults: CompatibilityResult[] = [
      {
        component1_id: 1,
        component2_id: 2,
        status: "compatible",
        confidence: 0.95,
        notes: "Test compatibility",
      },
    ];

    const selectedComponents: SelectedComponent[] = [
      {
        area: {
          id: "bottom-bracket",
          name: "Bottom Bracket",
          coordinates: { x: 330, y: 240, width: 45, height: 45 },
          category: "bottom_bracket" as any,
          isSelected: true,
        },
        component: {
          id: 1,
          name: "Test Component",
          brand: "Test Brand",
          category: "bottom_bracket" as any,
          compatibility_data: {},
        },
      },
    ];

    render(
      <BikeDiagram
        selectedComponents={selectedComponents}
        onComponentClick={mockOnComponentClick}
        compatibilityResults={compatibilityResults}
      />
    );

    const compatibleArea = screen.getByRole("button", {
      name: /bottom bracket.*currently selected/i,
    });

    // Should have compatible animation classes
    expect(compatibleArea).toHaveClass("bike-area-compatible-enhanced");
    expect(compatibleArea).toHaveClass("cyberpunk-glow-breathing");
  });
});
