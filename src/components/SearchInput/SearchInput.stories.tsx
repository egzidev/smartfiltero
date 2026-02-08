import {useRef, useState} from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import SearchInput from "./SearchInput";
import searchInputStyles from "./SearchInput.module.css";
import styles from "@/styles.module.css";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
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
