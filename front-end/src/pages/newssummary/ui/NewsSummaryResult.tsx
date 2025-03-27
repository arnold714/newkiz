interface NewsSummaryResultProps {
    thought: string;
}

export default function NewsSummaryResult({thought}: NewsSummaryResultProps) {
    return (
        <div>
            <div>ReporterPage</div>
            <p>{thought}</p>
        </div>
    );
  };