import {useRef, useState} from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import { SearchInput } from "@/components/SearchInput";
import searchInputStyles from "@/components/SearchInput/search-input.module.css";
import styles from "@/styles.module.css";
/**
 * Input component is the search/filter input field used in SmartFiltero.
 * It handles user input, focus events, and displays placeholder text.
 * 
 * Used internally by SmartFiltero as the main input field.
 */
export default {
  title: "Components/Input",
  component: SearchInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Input component is the main search/filter input field.

**Features:**
- Search query input
- Focus handling
- Change event handling
- Customizable placeholder
- Styling support

**Use Cases:**
- Main filter search input
- Text query input
- Filter trigger input
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    inputRef: {
      description: 'React ref for the input element. Used for programmatic control.',
      control: { type: 'object' },
      table: {
        type: { summary: 'React.RefObject<HTMLInputElement>' },
        category: 'Refs',
      },
    },
    query: {
      description: 'Current input value/query string.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'State',
      },
    },
    handleInputFocus: {
      description: 'Callback function called when the input receives focus.',
      action: 'focused',
      table: {
        type: { summary: 'InputFocusHandler' },
        category: 'Events',
      },
    },
    handleInputChange: {
      description: 'Callback function called when the input value changes.',
      action: 'changed',
      table: {
        type: { summary: 'InputChangeHandler' },
        category: 'Events',
      },
    },
    validateStyle: {
      description: 'Function to validate and return CSS class names for styling.',
      control: { type: 'object' },
      table: {
        type: { summary: 'StyleValidator' },
        category: 'Styling',
      },
    },
    placeholder: {
      description: 'Placeholder text shown when input is empty.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Content',
      },
    },
  },
  args: {
    handleInputFocus: () => {
    },
    handleInputChange: () => {
    },
  },
} as Meta<typeof SearchInput>;

const Template = (args: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(args.query || '');

  return (
    <div className={`${styles.container} ${styles.filterSearchContainer}`}>
      <div className={searchInputStyles.searchContainer}>
        <SearchInput
          {...args}
          inputRef={inputRef}
          query={query}
          handleInputFocus={() => console.log("Input focused")}
          handleInputChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

const FocusStateTemplate = (args: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(args.query || '');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className={`${styles.container} ${styles.filterSearchContainer}`}>
        <div className={searchInputStyles.searchContainer}>
          <SearchInput
            {...args}
            inputRef={inputRef}
            query={query}
            handleInputFocus={() => {
              setIsFocused(true);
              console.log("Input focused");
            }}
            handleInputChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div style={{ marginTop: '1rem'}}>Focused: {isFocused ? 'true' : 'false'}</div>
    </>
  )
}

export const Default: StoryObj<typeof SearchInput> = {
  render: Template,
  args: {
    placeholder: "Search or filter...",
  },
  parameters: {
    docs: {
      description: {
        story: 'Default input with a placeholder text guiding users on what to search or filter.',
      },
    },
  },
};

/**
 * Input with a pre-filled value.
 */
export const WithValue: StoryObj<typeof SearchInput> = {
  render: Template,
  args: {
    query: "laptop",
    placeholder: "Search or filter...",
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a pre-filled query value. Useful for default searches or restoring previous queries.',
      },
    },
  },
};

/**
 * Input in focused state with live focus indicator.
 */
export const FocusedState: StoryObj<typeof SearchInput> = {
  render: FocusStateTemplate,
  args: {
    placeholder: "Search or filter...",
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a live focus state indicator. Click the input to see the focus state change from false to true.',
      },
    },
  },
};

/**
 * Input with custom placeholder.
 */
export const CustomPlaceholder: StoryObj<typeof SearchInput> = {
  render: Template,
  args: {
    placeholder: "Search orders, customers, or filter by status...",
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom placeholder text that provides more specific guidance to users.',
      },
    },
  },
};
